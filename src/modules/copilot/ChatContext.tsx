import React, { createContext, useContext, ReactNode } from 'react';
import { ChatContextType } from './types';
import { useChatManager } from './hooks/useChatManager';

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

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const chatManager = useChatManager();

  const value: ChatContextType = {
    messages: chatManager.messages,
    input: chatManager.input,
    handleInputChange: chatManager.handleInputChange,
    handleSubmit: chatManager.handleSubmit,
    isLoading: chatManager.isLoading,
    error: chatManager.error,
    clearHistory: chatManager.clearHistory,
    stop: chatManager.stop,
    addInterruptionMessage: chatManager.addInterruptionMessage,
    status: chatManager.status,
    reload: chatManager.reload,
    append: chatManager.append,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
