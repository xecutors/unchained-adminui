import React from 'react';

interface Variation {
  _id: string;
  type: string;
  key: string;
  options: string[];
}

const VariationListCompact = ({ variations }: { variations: Variation[] }) => {
  if (!variations.length) return null;

  return (
    <div className="text-sm space-y-2">
      {variations.map(({ _id, type, key, options }) => (
        <div
          key={_id}
          className="border border-gray-200 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-900"
        >
          <div className="flex justify-between items-center">
            <span className="font-medium">{key}</span>
            <span className="text-xs text-gray-500">{type}</span>
          </div>
          <div className="text-xs text-gray-700 dark:text-gray-300 mt-1">
            {options.join(', ')}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VariationListCompact;
