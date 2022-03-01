import { useIntl } from 'react-intl';
import { CheckIcon } from '@heroicons/react/solid';

const timeline = [
  {
    id: 1,
    content: 'created',
    status: 'OPEN',
  },
  {
    id: 2,
    content: 'ordered',
    status: 'PENDING',
  },
  {
    id: 3,
    content: 'confirmed',
    status: 'CONFIRMED',
  },
  {
    id: 4,
    content: 'fullfilled',
    status: 'FULLFILLED',
  },
];

import formatDateTime from '../../common/utils/formatDateTime';

const OrderDetailProgress = ({ order }) => {
  const { formatMessage } = useIntl();

  const step = {
    OPEN: { id: 1, datetime: 'created' },
    PENDING: { id: 2, datetime: 'ordered' },
    CONFIRMED: { id: 3, datetime: 'confirmed' },
    FULLFILLED: { id: 4, datetime: 'fullfilled' },
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  const datetime = step[order.status].datetime;

  return (
    <>
      <div className="flow-root sm:hidden">
        <ul role="list" className="my-4">
          {timeline.map((event, id) => (
            <li key={event.id}>
              <div className="relative pb-8">
                {id !== timeline.length - 1 ? (
                  <span
                    className={classNames(
                      step[order.status].id > event.id - 0
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
                        step[order.status].id > event.id - 1
                          ? 'bg-indigo-600'
                          : 'bg-gray-600',
                        'h-5 w-5 rounded-full flex items-center justify-center',
                      )}
                    >
                      {step[order.status].id > event.id - 1 ? (
                        <CheckIcon
                          className="h-5 w-5 text-white"
                          aria-hidden="true"
                        />
                      ) : null}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 flex justify-between space-x-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        <span className="font-medium text-gray-900 capitalize">
                          {event.status}
                        </span>
                      </p>
                    </div>
                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                      {order[event.content]
                        ? formatDateTime(order[event.content], {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })
                        : null}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="hidden sm:block border-t border-gray-200 py-2 px-2 sm:px-2 lg:p-2">
        <h4 className="sr-only">Status</h4>
        <p className="text-sm font-medium text-gray-900">
          <span className="text-sm font-medium text-gray-900 capitalize">
            {formatMessage({
              id: 'order',
              defaultMessage: `${order.status.toLowerCase()}`,
            })}
          </span>
          &nbsp;on&nbsp;
          <span>
            {order[datetime]
              ? formatDateTime(order[datetime], {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })
              : `In the cart`}
          </span>
        </p>
        <div className="mt-2" aria-hidden="true">
          <div className="bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-2 bg-indigo-600 rounded-full"
              style={{
                width: `calc((${step[order.status].id} * 2) / 8 * 100%)`,
              }}
            />
          </div>

          <div className="hidden sm:grid grid-cols-4 text-sm font-medium text-gray-600 mt-2">

            {timeline.map((event, id) => (
              <div
                key={id}
                className={classNames(
                  step[order.status].id > event.id - 1 ? 'text-indigo-600' : '',
                  'text-center',
                )}
              >
                <span className="capitalize">
                  {formatMessage({
                    id: 'order_open',
                    defaultMessage: `${event.status.toLowerCase()}`,
                  })}
                </span>
                <span className="block">
                  {order[event.content]
                    ? formatDateTime(order[event.content], {
                        month: 'short',
                        day: 'numeric',
                      })
                    : null}
                </span>
              </div>
            ))}

          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailProgress;
