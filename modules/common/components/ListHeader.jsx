import { PlusSmIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import Sort from './Sort';

const ListHeader = ({
  addPath,
  children,
  addButtonText,
  sortFields,
  className,
}) => {
  const { formatMessage } = useIntl();
  const { query } = useRouter();
  return (
    <div className="px-2 my-3">
      <div className="-ml-2 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
        {children && (
          <div className="mt-2">
            <h3 className="text-xs leading-6 text-slate-900">{children}</h3>
          </div>
        )}
        {!query.viewGraph && sortFields && (
          <Sort sortFields={sortFields} className={className} />
        )}
        {addPath && (
          <div className="ml-4 mt-2 flex-shrink-0">
            <Link href={addPath}>
              <a
                type="button"
                className="relative inline-flex items-center rounded border border-transparent bg-indigo-500 px-3 py-3 text-sm font-medium  text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
              >
                <PlusSmIcon className="h-5 w-5" />
                <span className="ml-2">
                  {addButtonText ||
                    formatMessage({ id: 'add', defaultMessage: 'Add' })}
                </span>
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListHeader;
