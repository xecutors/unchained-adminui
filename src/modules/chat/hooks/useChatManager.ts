import { useEffect, useRef } from 'react';
import { useChat } from '@ai-sdk/react';
import { ChatMessage } from '../types';
import { chatStorage } from '../utils/chatStorage';
import { chatUtils } from '../utils/chatUtils';

function formatFileLink(url: string): string {
  const extension = url.split('.').pop()?.toLowerCase().split('?')[0] || '';

  const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'svg'];

  const isImage = imageExtensions.includes(extension);

  if (isImage) {
    return `![image](${url})`;
  }

  const filename = url.split('/').pop() || 'file';
  return `[${filename}](${url})`;
}

export const useChatManager = () => {
  const hasInitialized = useRef(false);

  const {
    messages,
    input,
    handleInputChange,
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
    api: '/chat',
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
    imageUrls?: string[],
  ) => {
    e.preventDefault();

    const messageText = input.trim();
    const assets = imageUrls?.map(formatFileLink).join('\n') ?? '';

    const messageContent = [messageText, assets].filter(Boolean).join('\n');
    handleInputChange({
      target: { value: '' },
    } as React.ChangeEvent<HTMLInputElement>);

    if (messageContent) {
      await append({
        id: `msg-${Date.now()}`,
        role: 'user',
        content: messageContent,
      });
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
