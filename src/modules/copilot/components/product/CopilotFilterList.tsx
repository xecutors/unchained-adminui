import React from 'react';
import { useIntl } from 'react-intl';
import useFormatDateTime from '../../../common/utils/useFormatDateTime';
import Link from 'next/link';

interface FilterOption {
  _id: string;
  created: string;
  isActive: boolean;
  key?: string;
  texts?: { locale?: string; name?: string };
  filterOption?: string;
}

interface Filter {
  _id: string;
  created: string;
  updated?: string;
  isActive: boolean;
  type: string;
  key: string;
  options?: FilterOption[] | null;
  tags?: string[];
  sortKey?: number;
  texts?: { locale?: string; name?: string };
}

interface CopilotFilterListProps {
  filters: Filter[];
}

export const CopilotFilterItem: React.FC<{ filter: Filter }> = ({ filter }) => {
  const { formatMessage } = useIntl();
  const { formatDateTime } = useFormatDateTime();

  return (
    <div className="flex items-center gap-4 p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow duration-200 w-full overflow-hidden">
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
          {filter.texts?.name || filter.key}
        </h3>
        <div className="flex items-center gap-3 mt-1 text-xs">
          <span
            className={`px-2 py-0.5 rounded ${
              filter.isActive
                ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200'
                : 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200'
            }`}
          >
            {filter.isActive
              ? formatMessage({ id: 'filter.active', defaultMessage: 'Active' })
              : formatMessage({
                  id: 'filter.inactive',
                  defaultMessage: 'Inactive',
                })}
          </span>
          <span className="bg-slate-100 dark:bg-slate-600 text-slate-500 dark:text-slate-300 px-2 py-0.5 rounded">
            {filter.type}
          </span>
          {typeof filter.sortKey === 'number' && (
            <span className="bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-200 px-2 py-0.5 rounded">
              {formatMessage({ id: 'filter.sortKey', defaultMessage: 'Sort' })}:{' '}
              {filter.sortKey}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 max-w-[40%]">
        {filter.options?.length ? (
          filter.options.map((opt) => (
            <span
              key={opt._id}
              className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                opt.isActive
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200'
                  : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
              }`}
            >
              {opt.filterOption || opt.key || opt._id}
            </span>
          ))
        ) : (
          <span className="text-xs text-slate-400">
            {formatMessage({
              id: 'filter.noOptions',
              defaultMessage: 'No options',
            })}
          </span>
        )}
      </div>

      <div className="flex flex-col items-end text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
        <span>
          {formatMessage({ id: 'filter.created', defaultMessage: 'Created' })}:{' '}
          {formatDateTime(filter.created)}
        </span>
        {filter.updated && (
          <span>
            {formatMessage({ id: 'filter.updated', defaultMessage: 'Updated' })}
            : {formatDateTime(filter.updated)}
          </span>
        )}
        {filter.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {filter.tags.map((tag) => (
              <span
                key={tag}
                className="bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200 px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <Link
          href={`/filters?filterId=${filter._id}`}
          className="block text-center text-sm text-slate-900 dark:text-slate-200 hover:text-slate-800 dark:hover:text-slate-300 py-3"
        >
          {formatMessage({ id: 'view', defaultMessage: 'View' })}
        </Link>
      </div>
    </div>
  );
};

const CopilotFilterList: React.FC<CopilotFilterListProps> = ({ filters }) => {
  if (!filters?.length) return null;

  return (
    <div className="flex flex-col gap-3 w-full">
      {filters.map((filter) => (
        <CopilotFilterItem key={filter._id} filter={filter} />
      ))}
    </div>
  );
};

export default CopilotFilterList;
