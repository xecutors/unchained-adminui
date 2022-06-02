import { CheckIcon, XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import useFormatDateTime from '../../common/utils/useFormatDateTime';

const SyncReportListItem = ({ data }) => {
  const { success } = data;
  const { formatMessage } = useIntl();
  const { formatDateTime } = useFormatDateTime();
  return (
    <li>
      <Link href={`/reports/daily-sync/${data._id}`}>
        <a className="block hover:bg-slate-50 dark:hover:bg-slate-400">
          <div className="flex items-center px-4 py-3 sm:px-6">
            <div className="flex min-w-0 flex-1 items-center">
              <div className="flex-shrink-0">
                {success ? (
                  <CheckIcon
                    className="h-5 w-5 rounded-full bg-green-400"
                    fill="none"
                    stroke="white"
                    viewBox="0 0 24 24"
                  />
                ) : (
                  <XIcon
                    className="h-5 w-5 rounded-full bg-red-400"
                    fill="none"
                    stroke="white"
                    viewBox="0 0 24 24"
                  />
                )}
              </div>
              <div className="min-w-0 flex-1 px-4">
                <div className="text-slate-900 dark:text-white md:block">
                  <div>
                    <p className="text-sm ">
                      {formatMessage(
                        {
                          id: 'started_at',
                          defaultMessage: 'Started: {time}',
                        },
                        {
                          time: formatDateTime(data.started, {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          }),
                        },
                      )}
                    </p>

                    <p className="mt-2 flex items-center text-sm ">
                      {formatMessage(
                        {
                          id: 'finished_at',
                          defaultMessage: 'Finished: {time}',
                        },
                        {
                          time: formatDateTime(data.finished, {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          }),
                        },
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <svg
                className="h-5 w-5 text-slate-400"
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
