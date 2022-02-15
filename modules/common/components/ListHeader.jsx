import Link from 'next/link';
import { useIntl } from 'react-intl';

const ListHeader = ({ addPath, children }) => {
  const { formatMessage } = useIntl();
  return (
    <div className="bg-white px-4 py-3 border-b border-gray-200 sm:px-6">
      <div className="-ml-2 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
        <div className="mt-2">
          <h3 className="text-xs leading-6 text-gray-900">{children}</h3>
        </div>
        {addPath && (
          <div className="ml-4 mt-2 flex-shrink-0">
            <Link href={addPath}>
              <a
                type="button"
                className="rounded relative inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium  text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-2">
                  {formatMessage({
                    id: 'add',
                    defaultMessage: 'Add',
                  })}
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
