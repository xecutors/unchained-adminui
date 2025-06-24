import { useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { ChatMessage } from '../types';
import { chatStorage } from '../utils/chatStorage';
import { chatUtils } from '../utils/chatUtils';

export const useChatManager = () => {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    status,
    setMessages,
    stop,
    reload,
  } = useChat({
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

  // Clear history function
  const clearHistory = () => {
    setMessages([]);
    chatStorage.clearMessages();
  };

  // Add interruption message
  const addInterruptionMessage = (currentStatus: string) => {
    const interruptionMessage = chatUtils.createInterruptionMessage(
      currentStatus as any,
    );
    setMessages((prev) => [...prev, interruptionMessage]);
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
