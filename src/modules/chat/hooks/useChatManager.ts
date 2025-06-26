import { useEffect, useRef } from 'react';
import { useChat } from '@ai-sdk/react';
import { ChatMessage } from '../types';
import { chatStorage } from '../utils/chatStorage';
import { chatUtils } from '../utils/chatUtils';
const fileArrayToFileList = (files: File[]): FileList => {
  const dataTransfer = new DataTransfer();
  files.forEach((file) => dataTransfer.items.add(file));
  return dataTransfer.files;
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
    imageFiles?: File[],
  ) => {
    e.preventDefault();

    if (imageFiles && imageFiles?.length > 0) {
      await originalHandleSubmit(e, {
        experimental_attachments: fileArrayToFileList(imageFiles),
      });
    } else {
      await originalHandleSubmit(e);
    }
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
