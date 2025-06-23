import React, { useState } from 'react';

interface UnknownToolResponseProps {
  data: any;
}

const UnknownToolResponse: React.FC<UnknownToolResponseProps> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative mb-4">
      <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
        Unknown tool response:
      </div>
      <div className="mb-4 relative rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        <pre
          className={`p-4 text-xs overflow-x-auto overflow-y-hidden ${
            !isExpanded ? 'max-h-[300px]' : ''
          }`}
        >
          <code className="text-slate-800 dark:text-slate-200">
            {JSON.stringify(data, null, 2)}
          </code>
        </pre>
        {!isExpanded && (
          <>
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 dark:from-slate-800 to-transparent pointer-events-none" />
            <button
              onClick={() => setIsExpanded(true)}
              className="absolute bottom-2 left-1/2 transform -translate-x-1/2 px-4 py-1.5 bg-white dark:bg-slate-700 text-sm text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors shadow-sm"
            >
              Show full response
            </button>
          </>
        )}
        {isExpanded && (
          <button
            onClick={() => setIsExpanded(false)}
            className="sticky bottom-2 left-1/2 transform -translate-x-1/2 mt-2 mb-2 px-4 py-1.5 bg-white dark:bg-slate-700 text-sm text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors shadow-sm"
          >
            Show less
          </button>
        )}
      </div>
    </div>
  );
};

export default UnknownToolResponse;
