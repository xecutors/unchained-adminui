import { useIntl } from 'react-intl';
import { CheckIcon } from '@heroicons/react/solid';
import useFormatDateTime from '../utils/useFormatDateTime';
import { classNames } from '../utils/utils';

const StatusProgress = ({ data, statusTypes, timeline }) => {
  const { formatMessage } = useIntl();
  const { formatDateTime } = useFormatDateTime();

  const { content } = timeline[data.status];

  const status = statusTypes.filter(({ value }) => timeline[value].visible);

  return (
    <>
      <div className="flow-root sm:hidden">
        <ul className="my-4">
          {status.map(({ value, label }, index) => (
            <li key={`${value}${label}`}>
              <div className="relative pb-8">
                {index !== status.length - 1 ? (
                  <span
                    className={classNames(
                      timeline[data.status].id > index + 1
                        ? 'bg-indigo-600'
                        : 'bg-gray-200',
                      'absolute top-2.5 left-2.5 -ml-px h-full w-0.5',
                    )}
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex items-center space-x-3">
                  <div>
                    <span
                      className={classNames(
                        timeline[data.status].id > index
                          ? 'bg-indigo-600'
                          : 'bg-gray-600',
                        'h-5 w-5 rounded-full flex items-center justify-center',
                      )}
                    >
                      {timeline[data.status].id > index ? (
                        <CheckIcon
                          className="h-5 w-5 text-white"
                          aria-hidden="true"
                        />
                      ) : null}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 flex justify-between items-center ml-4">
                    <div className="flex-auto">
                      <p className="text-sm text-gray-500">
                        <span className="w-full flex justify-between items-center font-medium text-gray-900 capitalize">
                          {value}
                          {timeline[value]?.Component &&
                            timeline[value].Component}
                        </span>
                      </p>
                    </div>
                    {timeline[data.status].id >= timeline[value].id ? (
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        {data[timeline[value].content]
                          ? formatDateTime(data[timeline[value].content])
                          : null}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="hidden sm:block border-t border-gray-200 py-2 px-2 sm:px-2 lg:p-2">
        <h4 className="sr-only">
          {formatMessage({
            id: 'status',
            defaultMessage: 'Status',
            description: 'Progress status',
          })}
        </h4>
        <p className="text-sm font-medium text-gray-900">
          <span className="text-sm font-medium text-gray-900 capitalize">
            {data.status.toLowerCase()}
          </span>
          &nbsp;on&nbsp;
          <span>
            {data[content] ? formatDateTime(data[content]) : `In the cart`}
          </span>
        </p>
        <div className="mt-2" aria-hidden="true">
          <div className="hidden sm:flex text-sm font-medium text-gray-600 mt-2">
            {status.map(({ value, label }) => (
              <div key={`${value}${label}`} className="sm:flex-auto">
                <div className="relative mb-4">
                  <span
                    className={classNames(
                      timeline[data.status].id >= timeline[value].id
                        ? 'bg-indigo-600'
                        : 'bg-gray-200',
                      'absolute top-0 left-0 -ml-px w-full h-2 first:rounded-tl-full first:rounded-bl-full',
                    )}
                    aria-hidden="true"
                  />
                </div>
                <div
                  className={classNames(
                    timeline[data.status].id >= timeline[value].id
                      ? 'text-indigo-600'
                      : 'text-gray-600',
                    'text-center',
                  )}
                >
                  <span className="capitalize flex flex-col justify-center items-center">
                    {timeline[value]?.Component
                      ? timeline[value].Component
                      : value}
                  </span>
                  <span className="block">
                    {timeline[data.status].id >= timeline[value].id
                      ? formatDateTime(data[timeline[value].content], {
                          month: 'short',
                          day: 'numeric',
                        })
                      : null}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default StatusProgress;
