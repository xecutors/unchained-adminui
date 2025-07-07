import React from 'react';
import Link from 'next/link';
import Badge from '../../modules/common/components/Badge';
import generateUniqueId from '../../modules/common/utils/getUniqueId';

interface ProductText {
  _id: string;
  productId: string;
  locale: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  brand?: string | null;
  vendor?: string | null;
  labels?: string[];
  created: string;
  updated: string;
}

interface Props {
  text: ProductText;
}

export const TextItemCompact: React.FC<Props> = ({ text }) => {
  const infoRow = (label: string, value: string | null | undefined) => {
    if (!value) return null;
    return (
      <div className="text-sm text-slate-700 dark:text-slate-300">
        <span className="font-medium text-slate-600 dark:text-slate-400">
          {label}:
        </span>{' '}
        {value}
      </div>
    );
  };

  return (
    <div className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow duration-200">
      <div className="w-16 h-16 flex-shrink-0 bg-slate-50 dark:bg-slate-700 rounded-md flex items-center justify-center text-2xl text-slate-400">
        🌐
      </div>

      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
            {text.title || 'Untitled'}
          </h3>
          <Badge text={text.locale.toUpperCase()} color="blue" square dotted />
        </div>

        {infoRow('Subtitle', text.subtitle)}
        {infoRow('Description', text.description)}
        {infoRow('Slug', text.slug)}
        {infoRow('Brand', text.brand)}
        {infoRow('Vendor', text.vendor)}

        {text.labels && text.labels.length > 0 && (
          <div className="text-sm text-slate-700 dark:text-slate-300">
            <span className="font-medium text-slate-600 dark:text-slate-400">
              Labels:
            </span>{' '}
            {text.labels.join(', ')}
          </div>
        )}
        <div className="text-xs text-slate-500 dark:text-slate-400">
          ID: {text._id}
        </div>
      </div>

      <Link
        href={`/products?slug=${generateUniqueId({ texts: text, _id: text.productId })}`}
        className="mt-2 px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
      >
        Edit
      </Link>
    </div>
  );
};

const TextsList = ({ texts }) => (
  <div className="space-y-3">
    {texts.map((text) => (
      <TextItemCompact key={text._id} text={text} />
    ))}
  </div>
);

export default TextsList;
