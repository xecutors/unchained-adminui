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
  return (
    <div className="text-sm space-y-2">
      {variations.map(({ _id, type, key, options, productId }) => (
        <div
          key={_id}
          className="flex items-center justify-between gap-4 p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md"
        >
          <div>
            <div className="text-sm font-medium">{key || '—'}</div>
            <div className="text-xs text-gray-600 dark:text-gray-300">
              {options?.join(', ') || '—'}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 uppercase">
              {type || '—'}
            </span>

            <Link
              href={`/products?slug=${generateUniqueId({ _id: productId })}&tab=variations`}
              className="px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex-shrink-0"
              aria-label={`Edit variation ${key}`}
              passHref
            >
              {formatMessage({ id: 'edit', defaultMessage: 'Edit' })}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VariationListCompact;
