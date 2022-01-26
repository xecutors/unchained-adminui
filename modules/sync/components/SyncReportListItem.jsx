import { format } from 'date-fns';
import Link from 'next/link';
import { useIntl } from 'react-intl';

const SyncReportListItem = ({ data }) => {
  const { success } = data;
  const { formatMessage } = useIntl();
  return (
    <li>
      <Link href={`/reports/daily-sync/${data._id}`}>
        <a className="block hover:bg-gray-50">
          <div className="flex items-center px-4 py-4 sm:px-6">
            <div className="min-w-0 flex-1 flex items-center">
              <div className="flex-shrink-0">
                {success ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 rounded-full"
                    viewBox="0 0 20 20"
                    fill="green"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 rounded-full"
                    viewBox="0 0 20 20"
                    fill="red"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                <div>
                  <p className="text-sm font-medium text-indigo-600 truncate">
                    {data?._id}
                  </p>
                  <p className="mt-2 flex items-center text-sm text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="truncate">{data.worker}</span>
                  </p>
                </div>
                <div className="hidden md:block">
                  <div>
                    <p className="text-sm text-gray-900">
                      {formatMessage(
                        {
                          id: 'started_at',
                          defaultMessage: 'Started: {time}',
                        },
                        {
                          time: format(new Date(data.started), 'Pp'),
                        },
                      )}
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500" />
                    <p className="mt-2 flex items-center text-sm text-gray-500">
                      {formatMessage(
                        {
                          id: 'finished_at',
                          defaultMessage: 'Finished: {time}',
                        },
                        {
                          time: format(new Date(data.finished), 'Pp'),
                        },
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default SyncReportListItem;
