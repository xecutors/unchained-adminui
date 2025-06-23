import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useChat } from '@ai-sdk/react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  [key: string]: any;
}

interface ChatContextType {
  messages: ChatMessage[];
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  error: any;
  clearHistory: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

const CHAT_STORAGE_KEY = 'copilot-chat-history';

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  // Get initial messages from localStorage
  const getInitialMessages = () => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(CHAT_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading chat history:', error);
      return [];
    }
  };

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    setMessages,
  } = useChat({
    maxSteps: 5,
    credentials: 'include',
    api: 'http://localhost:4010/chat',
    initialMessages: getInitialMessages(),
  });

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages && messages.length > 0) {
      try {
        localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
      } catch (error) {
        console.error('Error saving chat history:', error);
      }
    }
  }, [messages]);

  const clearHistory = () => {
    setMessages([]);
    try {
      localStorage.removeItem(CHAT_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing chat history:', error);
    }
  };

  const value: ChatContextType = {
    messages: messages as ChatMessage[],
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    clearHistory,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
