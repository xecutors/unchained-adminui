import Link from 'next/link';
import React from 'react';
import generateUniqueId from '../../modules/common/utils/getUniqueId';
import { useIntl } from 'react-intl';

interface Variation {
  _id: string;
  type: string;
  key: string;
  productId: string;
  options: string[];
}

const VariationListCompact = ({ variations }: { variations: Variation[] }) => {
  const { formatMessage } = useIntl();
  if (!variations.length) return null;
  console.log(variations);
  return (
    <div className="text-sm space-y-2">
      {variations.map(({ _id, type, key, options, productId }) => (
        <div
          key={_id}
          className="border border-gray-200 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-900"
        >
          <div className="flex justify-between items-center">
            <span className="font-medium">{key}</span>
            <span className="text-xs text-gray-500">
              {type}
              <Link
                href={`/products?slug=${generateUniqueId({ _id: productId })}&tab=variations`}
                className="px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex-shrink-0"
              >
                {formatMessage({ id: 'edit', defaultMessage: 'Edit' })}
              </Link>
            </span>
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
