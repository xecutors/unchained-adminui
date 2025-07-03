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

      let errorContent = '';

      if (
        error.message?.includes('fetch') ||
        error.message?.includes('Failed to fetch')
      ) {
        errorContent = `🚫 **Connection Error**\n\nCannot connect to the chat API server at \`localhost:4010\`.\n\n**To enable chat functionality:**\n1. Start the Unchained Commerce backend on localhost:4010\n2. Ensure the MCP (Model Context Protocol) server is running\n3. Check that the GraphQL endpoint is accessible\n\n**Current status:**\n- Chat interface: ✅ Ready\n- Backend integration: ❌ Required\n\n*Please start the Unchained Commerce backend to use this feature.*`;
      } else if (
        error.message?.includes('stream') ||
        error.message?.includes('data') ||
        error.message?.includes('process') ||
        error.message?.includes('An error occurred')
      ) {
        errorContent = `⚠️ **Stream Processing Error**\n\nThere was an error processing the AI response stream.\n\n**Possible causes:**\n1. Backend server at \`localhost:4010\` is not running\n2. MCP server is not responding correctly\n3. Missing or invalid API keys for Claude model\n4. Network connectivity issues\n\n**Error details:** ${error.message}\n\n*Please check the backend configuration and try again.*`;
      } else {
        errorContent = `❌ **Chat Error**\n\nAn unexpected error occurred: ${error.message}\n\n*Please try again or check the console for more details.*`;
      }

      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: errorContent,
      };
      setMessages((prev) => [...prev, errorMessage]);
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

    try {
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
    } catch (error) {
      console.error('Error in handleSubmit:', error);

      // Create error message if not handled by onError
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: `❌ **Submission Error**\n\nFailed to send your message. This usually happens when the backend server is not running.\n\n**Error:** ${error instanceof Error ? error.message : 'Unknown error'}\n\n*Please ensure the Unchained Commerce backend is running on localhost:4010.*`,
      };

      setMessages((prev) => [...prev, errorMessage]);
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
    append,
  };
};
