import { useEffect, useRef } from 'react';
import { useChat } from '@ai-sdk/react';
import { ChatMessage } from '../types';
import { chatStorage } from '../utils/chatStorage';
import { chatUtils } from '../utils/chatUtils';

const convertFilesToAttachments = async (files): Promise<FileList[]> => {
  const attachments: FileList[] = await Promise.all(
    Array.from(files).map(
      (file: File) =>
        new Promise<FileList>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve({
              name: file.name as any,
              contentType: file.type,
              url: reader.result as string, // base64 data URL
            });
          };
          reader.onerror = reject;
          reader.readAsDataURL(file); // triggers `onload`
        }),
    ),
  );

  return attachments;
};

export const useChatManager = () => {
  const hasInitialized = useRef(false);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit: originalHandleSubmit,
    isLoading,
    error,
    status,
    setMessages,
    stop,
    reload,
    append,
  } = useChat({
    streamProtocol: 'data',
    maxSteps: 5,
    credentials: 'include',
    api: 'http://localhost:4010/chat',
    initialMessages: chatStorage.loadMessages(),
    onError: (error) => {
      console.error('Chat error:', error);
      // Add helpful error message for connection issues
      if (error.message?.includes('fetch')) {
        const errorMessage: ChatMessage = {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content: `🚫 **Connection Error**\n\nCannot connect to the chat API server at \`localhost:4010\`.\n\n**This app uses static export mode, so API routes are disabled.**\n\n**To enable chat functionality:**\n1. Start the proper chat API server on localhost:4010\n2. The server should implement the AI SDK streaming format\n3. Include tool calling for product management\n\n**Current status:**\n- Chat interface: ✅ Ready\n- Backend integration: ❌ Required\n\n*Please set up the backend chat service to use this feature.*`,
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    },
  });

  // Save messages to localStorage whenever they change
  useEffect(() => {
    chatStorage.saveMessages(messages as ChatMessage[]);
  }, [messages]);

  /* // Auto-initialize chat with introduction when empty
  useEffect(() => {
    if (!hasInitialized.current && status === 'ready' && messages.length === 0) {
      hasInitialized.current = true;

      // Send introduction message automatically
      append({
        role: 'user',
        content: 'Give a brief introduction. Show your main tools in a simple grid - keep it short and actionable.',
      });
    }
  }, [status, messages.length, append]); */

  const clearHistory = () => {
    setMessages([]);
    chatStorage.clearMessages();
    hasInitialized.current = false; // Reset initialization flag
  };

  // Add interruption message
  const addInterruptionMessage = (currentStatus: string) => {
    const interruptionMessage = chatUtils.createInterruptionMessage(
      currentStatus as any,
    );
    setMessages((prev) => [...prev, interruptionMessage]);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    imageFile?: FileList | null,
  ) => {
    e.preventDefault();

    // Convert FileList to array of File objects if provided
    const attachments = imageFile ? Array.from(imageFile) : undefined;

    // Call the original handleSubmit (which uses the current input)
    originalHandleSubmit(e, {
      experimental_attachments: await convertFilesToAttachments(attachments),
    });
  };
  return {
    messages: messages as ChatMessage[],
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    status,
    clearHistory,
    stop,
    addInterruptionMessage,
    reload,
  };
};
