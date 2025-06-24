import React, { useState, useEffect } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useChatContext } from '../../modules/chat';

const CopilotInput: React.FC = () => {
  const { input, handleInputChange, handleSubmit } = useChatContext();
  const [inputHistory, setInputHistory] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('copilot-input-history');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Save input history to localStorage
  useEffect(() => {
    if (inputHistory.length > 0) {
      localStorage.setItem(
        'copilot-input-history',
        JSON.stringify(inputHistory.slice(-50)),
      ); // Keep last 50 entries
    }
  }, [inputHistory]);

  return (
    <div className="sticky bottom-6 max-w-4xl mx-auto w-full px-4">
      <div className="absolute bottom-full left-0 right-0 h-24 bg-gradient-to-t from-slate-100 dark:from-slate-900 to-transparent pointer-events-none" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          try {
            if (input.trim()) {
              setInputHistory((prev) => [...prev, input]);
              setHistoryIndex(-1);
            }
            handleSubmit(e);
          } catch (e) {
            console.error(e);
          }
        }}
        className="bg-white dark:bg-slate-800 shadow-2xl border border-slate-300 dark:border-slate-700 rounded-md p-3"
      >
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (inputHistory.length > 0) {
                  const newIndex =
                    historyIndex === -1
                      ? inputHistory.length - 1
                      : Math.max(0, historyIndex - 1);
                  setHistoryIndex(newIndex);
                  handleInputChange({
                    target: { value: inputHistory[newIndex] },
                  } as any);
                }
              } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (historyIndex !== -1) {
                  const newIndex = historyIndex + 1;
                  if (newIndex >= inputHistory.length) {
                    setHistoryIndex(-1);
                    handleInputChange({ target: { value: '' } } as any);
                  } else {
                    setHistoryIndex(newIndex);
                    handleInputChange({
                      target: { value: inputHistory[newIndex] },
                    } as any);
                  }
                }
              }
            }}
            placeholder="Type your message..."
            className="flex-1 border-0 bg-slate-50 dark:bg-slate-700 dark:text-slate-200 dark:placeholder-slate-400 rounded-md px-4 py-2 focus:ring-2 focus:ring-slate-400"
          />
          <button
            type="submit"
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 focus:ring-2 focus:ring-slate-700 focus:outline-hidden rounded-md"
          >
            <PaperAirplaneIcon className="h-6 w-6" strokeWidth={2} />
          </button>
        </div>
      </form>
      <div className="absolute top-full left-0 right-0 h-6 backdrop-blur-md pointer-events-none" />
    </div>
  );
};

export default CopilotInput;
