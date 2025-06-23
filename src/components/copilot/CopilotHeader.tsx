import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useChatContext } from '../../modules/chat';

const CopilotHeader: React.FC = () => {
  const { messages, clearHistory } = useChatContext();

  return (
    <header className="p-4 mt-1 flex items-center justify-between max-w-4xl mx-auto w-full">
      <div className="text-xl font-semibold text-slate-900 dark:text-slate-100">
        Unchained
        <span className="font-light ml-1">
          Copilot<span className="text-xs ml-1"> 1.0</span>
        </span>
      </div>
      {messages.length > 0 && (
        <button
          onClick={clearHistory}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          <TrashIcon className="h-4 w-4" />
          Clear History
        </button>
      )}
    </header>
  );
};

export default CopilotHeader;
