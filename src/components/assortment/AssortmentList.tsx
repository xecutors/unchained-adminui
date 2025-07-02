import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { Squares2X2Icon, ListBulletIcon } from '@heroicons/react/24/outline';
import AssortmentListItem from './AssortmentListItem';
import AssortmentListItemCompact from './AssortmentListItemCompact';

interface AssortmentListProps {
  assortments: any[];
  className?: string;
}

const AssortmentList: React.FC<AssortmentListProps> = ({
  assortments,
  className,
}) => {
  const { formatMessage } = useIntl();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(() => {
    if (typeof window !== 'undefined') {
      return (
        (localStorage.getItem('assortmentViewMode') as 'grid' | 'list') ||
        'grid'
      );
    }
    return 'grid';
  });

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('assortmentViewMode', mode);
    }
  };

  if (!assortments || assortments.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500 dark:text-slate-400">
        {formatMessage({
          id: 'no_assortments_found',
          defaultMessage: 'No assortments found',
        })}
      </div>
    );
  }

  return (
    <div className={classNames('space-y-4', className)}>
      {/* View Mode Toggle */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-slate-600 dark:text-slate-400">
          {formatMessage(
            {
              id: 'assortments_count',
              defaultMessage: '{count} assortments',
            },
            { count: assortments.length },
          )}
        </div>
        <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
          <button
            onClick={() => handleViewModeChange('grid')}
            className={classNames(
              'p-2 rounded-md transition-colors',
              viewMode === 'grid'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200',
            )}
          >
            <Squares2X2Icon className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleViewModeChange('list')}
            className={classNames(
              'p-2 rounded-md transition-colors',
              viewMode === 'list'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200',
            )}
          >
            <ListBulletIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Assortment List */}
      {viewMode === 'grid' ? (
        <div
          className="gap-5"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gridTemplateRows: 'span 6',
          }}
        >
          {assortments.map((assortment) => (
            <AssortmentListItem key={assortment._id} assortment={assortment} />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {assortments.map((assortment) => (
            <AssortmentListItemCompact
              key={assortment._id}
              assortment={assortment}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AssortmentList;
