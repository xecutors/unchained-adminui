import React from 'react';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import {
  FolderIcon,
  EyeIcon,
  EyeSlashIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';
import generateUniqueId from '../../modules/common/utils/getUniqueId';

interface AssortmentListItemProps {
  assortment: any;
  className?: string;
}

const AssortmentListItem: React.FC<AssortmentListItemProps> = ({
  assortment,
  className,
}) => {
  const { formatMessage } = useIntl();

  const getStatusBadge = (isActive: boolean) => {
    if (isActive) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">
          <EyeIcon className="w-3 h-3" />
          {formatMessage({ id: 'active', defaultMessage: 'Active' })}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
        <EyeSlashIcon className="w-3 h-3" />
        {formatMessage({ id: 'inactive', defaultMessage: 'Inactive' })}
      </span>
    );
  };

  const getAssortmentImage = () => {
    const media = assortment.media?.[0];
    if (media?.file?.url) {
      return (
        <img
          src={media.file.url}
          alt={assortment.texts?.title || 'Assortment'}
          className="w-full h-32 object-cover"
        />
      );
    }
    return (
      <div className="w-full h-32 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
        <FolderIcon className="w-12 h-12 text-slate-400 dark:text-slate-600" />
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div
      className={classNames(
        'bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition-shadow',
        className,
      )}
    >
      {/* Image */}
      <div className="relative">
        {getAssortmentImage()}
        <div className="absolute top-3 right-3">
          {getStatusBadge(assortment.isActive)}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="space-y-2">
          {/* Title */}
          <h3 className="font-medium text-slate-900 dark:text-slate-100 line-clamp-2">
            {assortment.texts?.title ||
              formatMessage({
                id: 'untitled_assortment',
                defaultMessage: 'Untitled Assortment',
              })}
          </h3>

          {/* Subtitle */}
          {assortment.texts?.subtitle && (
            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
              {assortment.texts.subtitle}
            </p>
          )}

          {/* Metadata */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-500">
            <div className="flex items-center gap-1">
              <CalendarIcon className="w-3 h-3" />
              {formatDate(assortment.updated)}
            </div>
            {assortment.sequence && (
              <span className="font-mono">#{assortment.sequence}</span>
            )}
          </div>

          {/* Tags */}
          {assortment.tags && assortment.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {assortment.tags.slice(0, 3).map((tag: string, index: number) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded"
                >
                  {tag}
                </span>
              ))}
              {assortment.tags.length > 3 && (
                <span className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded">
                  +{assortment.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Children Count */}
          {assortment.childrenCount > 0 && (
            <div className="text-xs text-slate-600 dark:text-slate-400">
              {formatMessage(
                {
                  id: 'children_count',
                  defaultMessage: '{count} children',
                },
                { count: assortment.childrenCount },
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700">
          <Link href={`/assortments/${generateUniqueId(assortment)}`}>
            <span className="inline-flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100">
              {formatMessage({ id: 'edit', defaultMessage: 'Edit' })}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AssortmentListItem;
