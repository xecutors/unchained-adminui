import { PlusIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useIntl } from 'react-intl';

const ListHeader = ({
  addPath = null,
  children = null,
  addButtonText = null,
  totalRecords = null,
}) => {
  const { formatMessage } = useIntl();
  return (
    <div className="px-2 my-3">
      {totalRecords !== null ? (
        <div className="text-md text-slate-950 dark:text-slate-100 mb-3">
          {formatMessage(
            { id: 'total_records', defaultMessage: '{total} records found' },
            {
              total: totalRecords ?? 0,
            },
          )}
        </div>
      ) : null}
      <div className="space-y-3">
        {children && (
          <div className="flex items-center">
            <h3 className="text-xs leading-6 text-slate-900 dark:text-slate-200">
              {children}
            </h3>
          </div>
        )}

        {addPath && (
          <div className="flex justify-start">
            <Link
              href={addPath}
              className="relative inline-flex items-center rounded-sm border border-transparent bg-slate-900 px-3 py-3 text-sm font-medium  text-white shadow-xs hover:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-slate-800 focus:ring-offset-2"
            >
              <PlusIcon className="h-5 w-5" />
              <span className="ml-2">
                {addButtonText ||
                  formatMessage({ id: 'add', defaultMessage: 'Add' })}
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListHeader;
