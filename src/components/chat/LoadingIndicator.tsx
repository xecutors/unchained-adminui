import React, { useState, useEffect } from 'react';
import { CommandLineIcon, StopIcon } from '@heroicons/react/24/outline';
import { useChatContext } from '../../modules/chat';

const LoadingIndicator: React.FC = () => {
  const { status, stop, addInterruptionMessage } = useChatContext();
  const [isStopped, setIsStopped] = useState(false);
  const loadingMessages = {
    submitted: 'Processing...',
    streaming: 'Generating...',
  };

  // Reset stopped state when a new operation starts
  useEffect(() => {
    if (status === 'submitted' || status === 'streaming') {
      setIsStopped(false);
    }
  }, [status]);

  const handleStop = () => {
    const currentStatus = status;
    setIsStopped(true); // Immediately hide the loading indicator
    stop();
    // Add interruption message after a brief delay to ensure stop takes effect
    setTimeout(() => {
      addInterruptionMessage(currentStatus);
    }, 100);
  };

  // Don't render if status is ready or if manually stopped
  if (status === 'ready' || isStopped) {
    return null;
  }

  return (
    <div className="flex justify-start">
      <div className="flex items-start gap-3 px-4 py-3">
        <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-800 dark:from-slate-500 dark:to-slate-700 rounded-lg flex items-center justify-center shadow-sm">
          <CommandLineIcon className="w-5 h-5 text-white animate-pulse" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Copilot
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500 dark:text-slate-400 italic transition-opacity duration-300">
              {loadingMessages[status]}
            </span>
            <div className="flex gap-1">
              <div
                className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce"
                style={{ animationDelay: '0ms' }}
              />
              <div
                className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce"
                style={{ animationDelay: '150ms' }}
              />
              <div
                className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce"
                style={{ animationDelay: '300ms' }}
              />
            </div>
          </div>
        </div>
        <button
          onClick={handleStop}
          className="ml-2 p-1.5 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
          title="Stop generation"
        >
          <StopIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default LoadingIndicator;
