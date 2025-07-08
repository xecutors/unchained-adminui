import React from 'react';
import Link from 'next/link';
import Badge from '../../modules/common/components/Badge';
import generateUniqueId from '../../modules/common/utils/getUniqueId';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { useIntl } from 'react-intl';

interface ProductText {
  _id: string;
  productId?: string;
  assortmentId?: string;
  filterId?: string;
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
  productVariationId?: string | null;
  productVariationOptionValue?: string | null;
}

interface Props {
  text: ProductText;
  tool: string;
  productId?: string | null;
  assortmentId?: string | null;
}

export const TextItemCompact = ({
  tool,
  text,
  productId = null,
  assortmentId = null,
}: Props) => {
  const { formatMessage } = useIntl();
  let normalizedHref = '';
  switch (tool) {
    case 'product_getTexts':
      normalizedHref = `/products?slug=${generateUniqueId({ texts: text, _id: text?.productId })}`;
      break;
    case 'productMedia_getTexts':
    case 'productMedia_updateTexts':
      normalizedHref = `/products?slug=${generateUniqueId({ texts: text, _id: productId })}&tab=media`;
      break;
    case 'assortment_getTexts':
      normalizedHref = `/assortments?assortmentSlug=${generateUniqueId({ texts: text, _id: text?.assortmentId })}`;
      break;
    case 'assortmentMedia_getTexts':
    case 'assortmentMedia_updateTexts':
      normalizedHref = `/assortments?assortmentSlug=${generateUniqueId({ texts: text, _id: assortmentId })}&tab=media`;
      break;
    case 'productVariation_updateTexts':
    case 'productVariation_getTexts':
      normalizedHref = `/products?slug=${generateUniqueId({ texts: text, _id: productId })}&tab=variations`;
      break;

    default:
      normalizedHref = `/products?slug=${generateUniqueId({ texts: text, _id: text?.productId })}`;
      break;
  }

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
        <GlobeAltIcon className="w-6 h-6" />
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
        {infoRow('Variation option', text?.productVariationOptionValue)}
        {infoRow('Variation ID', text?.productVariationId)}

        {text.labels && text.labels.length > 0 && (
          <div className="text-sm text-slate-700 dark:text-slate-300">
            <span className="font-medium text-slate-600 dark:text-slate-400">
              {formatMessage({ id: 'labels', defaultMessage: 'Labels' })}:
            </span>{' '}
            {text.labels.join(', ')}
          </div>
        )}
        <div className="text-xs text-slate-500 dark:text-slate-400">
          {formatMessage({ id: 'id', defaultMessage: 'ID' })}: {text._id}
        </div>
      </div>

      <Link
        href={normalizedHref}
        className="mt-2 px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
      >
        {formatMessage({ id: 'edit', defaultMessage: 'Edit' })}
      </Link>
    </div>
  );
};

const TextsList = ({ tool, texts, ...rest }) => {
  return (
    <div className="space-y-3">
      {texts.map((text) => (
        <TextItemCompact tool={tool} key={text._id} text={text} {...rest} />
      ))}
    </div>
  );
};

export default TextsList;
