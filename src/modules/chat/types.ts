export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  parts?: any[];
  [key: string]: any;
}

export interface ChatContextType {
  messages: ChatMessage[];
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  error: any;
  clearHistory: () => void;
  stop: () => void;
  addInterruptionMessage: (currentStatus: string) => void;
  status: 'error' | 'submitted' | 'streaming' | 'ready';
}

export type ChatStatus = 'error' | 'submitted' | 'streaming' | 'ready';
