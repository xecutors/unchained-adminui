import { ChatMessage } from '../types';

export const CHAT_STORAGE_KEY = 'copilot-chat-history';

export const chatStorage = {
  /**
   * Load chat messages from localStorage with cleanup
   */
  loadMessages(): ChatMessage[] {
    if (typeof window === 'undefined') return [];

    try {
      const stored = localStorage.getItem(CHAT_STORAGE_KEY);
      const messages = stored ? JSON.parse(stored) : [];

      // Filter out incomplete tool invocations on load
      return messages.filter((message: ChatMessage) => {
        if (message.role === 'assistant' && message.parts) {
          const hasIncompleteTools = message.parts.some(
            (part: any) =>
              part.type === 'tool-invocation' &&
              part.toolInvocation &&
              (!part.toolInvocation.result ||
                part.toolInvocation.state === 'call'),
          );
          return !hasIncompleteTools;
        }
        return true;
      });
    } catch (error) {
      console.error('Error loading chat history:', error);
      return [];
    }
  },

  /**
   * Save chat messages to localStorage
   */
  saveMessages(messages: ChatMessage[]): void {
    if (!messages || messages.length === 0) return;

    try {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  },

  /**
   * Clear all chat messages from localStorage
   */
  clearMessages(): void {
    try {
      localStorage.removeItem(CHAT_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing chat history:', error);
    }
  },
};
