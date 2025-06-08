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
        <div className="text-lg italic text-indigo-900 font-black">
          {formatMessage(
            { id: 'total_records', defaultMessage: '{total} records found' },
            {
              total: totalRecords ?? 0,
            },
          )}
        </div>
      ) : null}
      <div className="-ml-2 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
        {children && (
          <div className="mt-2">
            <h3 className="text-xs leading-6 text-slate-900">{children}</h3>
          </div>
        )}

        {addPath && (
          <div className="ml-4 mt-2 shrink-0">
            <Link
              href={addPath}
              className="relative inline-flex items-center rounded-sm border border-transparent bg-indigo-500 px-3 py-3 text-sm font-medium  text-white shadow-xs hover:bg-indigo-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
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
