import React from 'react';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { FolderIcon } from '@heroicons/react/24/outline';
import Badge from '../../modules/common/components/Badge';
import generateUniqueId from '../../modules/common/utils/getUniqueId';

interface AssortmentListItemCompactProps {
  assortment: any;
  className?: string;
}

const AssortmentListItemCompact: React.FC<AssortmentListItemCompactProps> = ({
  assortment,
  className,
}) => {
  const { formatMessage } = useIntl();

  const getStatusBadge = (isActive: boolean) => {
    return (
      <Badge
        text={formatMessage({
          id: isActive ? 'active' : 'inactive',
          defaultMessage: isActive ? 'Active' : 'Inactive',
        })}
        color={isActive ? 'green' : 'red'}
        square
        dotted
      />
    );
  };

  const getAssortmentThumbnail = () => {
    const media = assortment.media?.[0];
    if (media?.file?.url) {
      return (
        <img
          src={media.file.url}
          alt={assortment.texts?.title || 'Assortment'}
          className="w-12 h-12 object-cover rounded-lg"
        />
      );
    }
    return (
      <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
        <FolderIcon className="w-6 h-6 text-slate-400 dark:text-slate-600" />
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
        'bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 hover:shadow-sm transition-shadow',
        className,
      )}
    >
      <div className="flex items-center gap-4">
        {/* Thumbnail */}
        <div className="flex-shrink-0">{getAssortmentThumbnail()}</div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              {/* Title and Status */}
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-slate-900 dark:text-slate-100 truncate">
                  {assortment.texts?.title ||
                    formatMessage({
                      id: 'untitled_assortment',
                      defaultMessage: 'Untitled Assortment',
                    })}
                </h3>
                {getStatusBadge(assortment.isActive)}
              </div>

              {/* Subtitle */}
              {assortment.texts?.subtitle && (
                <p className="text-sm text-slate-600 dark:text-slate-400 truncate mb-1">
                  {assortment.texts.subtitle}
                </p>
              )}

              {/* Metadata */}
              <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-500">
                <span>Updated: {formatDate(assortment.updated)}</span>
                {assortment.sequence && (
                  <span className="font-mono">#{assortment.sequence}</span>
                )}
                {assortment.childrenCount > 0 && (
                  <span>
                    {formatMessage(
                      {
                        id: 'children_count',
                        defaultMessage: '{count} children',
                      },
                      { count: assortment.childrenCount },
                    )}
                  </span>
                )}
              </div>

              {/* Tags */}
              {assortment.tags && assortment.tags.length > 0 && (
                <div className="flex items-center gap-1 mt-2">
                  {assortment.tags
                    .slice(0, 2)
                    .map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  {assortment.tags.length > 2 && (
                    <span className="text-xs text-slate-500 dark:text-slate-500">
                      +{assortment.tags.length - 2} more
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Action */}
            <div className="flex-shrink-0">
              <Link
                href={`/assortments?assortmentSlug=${generateUniqueId(assortment)}`}
                className="px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                {formatMessage({ id: 'edit', defaultMessage: 'Edit' })}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssortmentListItemCompact;
