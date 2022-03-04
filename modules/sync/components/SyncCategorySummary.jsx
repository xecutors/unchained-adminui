import { useIntl } from 'react-intl';
import useModal from '../../modal/hooks/useModal';

const SyncCategorySummary = ({
  categoryName,
  statistics,
  removedList,
  publishedList,
}) => {
  const { formatMessage } = useIntl();
  const { setModal } = useModal();
  return (
    <>
      <h3 className="mt-5 pt-5">{categoryName}</h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow-lg rounded-lg overflow-hidden">
          <dt>
            <div className="absolute bg-indigo-500 rounded-md p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="ml-16 text-sm font-medium text-gray-500 truncate">
              {formatMessage(
                {
                  id: 'sync_added',
                  defaultMessage: 'Added { categoryName } ',
                },
                {
                  categoryName,
                },
              )}
            </p>
          </dt>
          <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
            <p className="flex items-baseline text-2xl font-semibold text-green-600">
              <svg
                className="self-center flex-shrink-0 h-5 w-5 text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {statistics.new}
            </p>
            {publishedList && (
              <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <a
                    href="#"
                    onClick={async () => {
                      await setModal(publishedList);
                    }}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {formatMessage({
                      id: 'view_all',
                      defaultMessage: 'View all',
                    })}
                  </a>
                </div>
              </div>
            )}
          </dd>
        </div>

        <div className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow-lg rounded-lg overflow-hidden">
          <dt>
            <div className="absolute bg-indigo-500 rounded-md p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="ml-16 text-sm font-medium text-gray-500 truncate">
              {formatMessage(
                {
                  id: 'sync_removed',
                  defaultMessage: 'Removed { categoryName } ',
                },
                {
                  categoryName,
                },
              )}
            </p>
          </dt>
          <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
            <p className="flex items-baseline text-2xl font-semibold text-red-600">
              <svg
                className="self-center flex-shrink-0 h-5 w-5 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {statistics.removed}
            </p>
            {removedList && (
              <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <a
                    href="#"
                    onClick={async () => {
                      await setModal(removedList);
                    }}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {formatMessage({
                      id: 'view_all',
                      defaultMessage: 'View all',
                    })}
                    <span className="sr-only">
                      {formatMessage({
                        id: 'average_stat',
                        defaultMessage: 'Avg. Open Rate stats',
                      })}
                    </span>
                  </a>
                </div>
              </div>
            )}
          </dd>
        </div>

        <div className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow-lg rounded-lg overflow-hidden">
          <dt>
            <div className="absolute bg-indigo-500 rounded-md p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                />
              </svg>
            </div>
            <p className="ml-16 text-sm font-medium text-gray-500 truncate">
              {formatMessage(
                {
                  id: 'total_variable_category',
                  defaultMessage: 'Total { categoryName } ',
                  description:
                    'Used in report where category is swapped with product, filter or assortment ',
                },
                {
                  categoryName,
                },
              )}
            </p>
          </dt>
          <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
            <p className="text-2xl font-semibold text-gray-900">
              {statistics.total}
            </p>
            <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
              &nbsp;
            </div>
          </dd>
        </div>
      </dl>
    </>
  );
};

export default SyncCategorySummary;
