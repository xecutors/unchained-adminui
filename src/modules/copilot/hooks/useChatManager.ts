import { useEffect, useRef } from 'react';
import { useChat } from '@ai-sdk/react';
import { ChatMessage } from '../types';
import { chatUtils } from '../utils/chatUtils';
import useLocalStorage from '../../common/hooks/useLocalStorage';

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
  const [chatHistory, setChatHistory] = useLocalStorage(
    'copilot-chat-history',
    [],
  );
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
    maxSteps: 2,
    credentials: 'include',
    api: process.env.NEXT_PUBLIC_CHAT_URL || '/chat',
    initialMessages: chatHistory,
    onError: (error) => {
      console.error('Chat error:', error);

      let errorContent = '';

      if (
        error.message?.includes('401') ||
        error.message?.includes('invalid_token') ||
        error.message?.includes('Unauthorized') ||
        error.message?.includes('HTTP 401')
      ) {
        errorContent = `🔐 **Authentication Error**\n\nYour session has expired or the authentication token is invalid.\n\n**To fix this:**\n1. **Refresh the page** (Ctrl+R / Cmd+R) to renew your session\n2. If the problem persists, log out and log back in\n3. Check that you have proper permissions for chat functionality\n\n**Quick action:** Click [here to refresh the page](javascript:window.location.reload())\n\n*This happens when your session expires after being idle for too long.*`;
      } else if (
        error.message?.includes('fetch') ||
        error.message?.includes('Failed to fetch') ||
        error.message?.includes('NetworkError')
      ) {
        const chatUrl = process.env.NEXT_PUBLIC_CHAT_URL || '/chat';
        errorContent = `🚫 **Connection Error**\n\nCannot connect to the chat API server at \`${chatUrl}\`.\n\n**To enable chat functionality:**\n1. Start the Unchained Commerce backend on localhost:4010\n2. Ensure the chat/MCP endpoint is properly configured\n3. Check that NEXT_PUBLIC_CHAT_URL is set correctly\n\n**Current configuration:**\n- Chat URL: \`${chatUrl}\`\n- Backend expected: \`http://localhost:4010/chat\`\n\n*Please start the Unchained Commerce backend to use this feature.*`;
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
    setChatHistory(messages as ChatMessage[]);
  }, [messages]);

  const clearHistory = () => {
    setMessages([]);
    setChatHistory([]);
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

      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';

      // Check for authentication errors first
      if (
        errorMessage.includes('401') ||
        errorMessage.includes('invalid_token') ||
        errorMessage.includes('Unauthorized') ||
        errorMessage.includes('HTTP 401')
      ) {
        const authErrorMessage: ChatMessage = {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content: `🔐 **Authentication Error**\n\nYour session has expired or the authentication token is invalid.\n\n**To fix this:**\n1. **Refresh the page** (Ctrl+R / Cmd+R) to renew your session\n2. If the problem persists, log out and log back in\n3. Check that you have proper permissions for chat functionality\n\n**Quick action:** Click [here to refresh the page](javascript:window.location.reload())\n\n*This happens when your session expires after being idle for too long.*`,
        };
        setMessages((prev) => [...prev, authErrorMessage]);
      } else {
        // Handle other errors
        const generalErrorMessage: ChatMessage = {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content: `❌ **Submission Error**\n\nFailed to send your message. This usually happens when the backend server is not running.\n\n**Error:** ${errorMessage}\n\n*Please ensure the Unchained Commerce backend is running on localhost:4010.*`,
        };
        setMessages((prev) => [...prev, generalErrorMessage]);
      }
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
