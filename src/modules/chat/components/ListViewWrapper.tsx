import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Squares2X2Icon, ListBulletIcon } from '@heroicons/react/24/outline';

type ViewMode = 'grid' | 'list';

interface ListViewWrapperProps {
  storageKey?: string;
  className?: string;
  children: (viewMode: ViewMode) => React.ReactNode;
}

const ListViewWrapper: React.FC<ListViewWrapperProps> = ({
  storageKey = 'listViewMode',
  className,
  children,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(storageKey) as ViewMode | null;
      if (saved === 'grid' || saved === 'list') {
        setViewMode(saved);
      }
    }
  }, [storageKey]);

  const updateViewMode = (mode: ViewMode) => {
    setViewMode(mode);
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, mode);
    }
  };

  return (
    <div className={classNames('space-y-4', className)}>
      <div className="flex justify-end">
        <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
          <button
            onClick={() => updateViewMode('grid')}
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
            onClick={() => updateViewMode('list')}
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
      {children(viewMode)}
    </div>
  );
};

export default ListViewWrapper;
