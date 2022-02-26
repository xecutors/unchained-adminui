import { useIntl } from 'react-intl';
import { CheckIcon } from '@heroicons/react/solid';

import formatDateTime from '../../common/utils/formatDateTime';

const progress = [
  {
    id: 1,
    content: 'Open',
    datetime: 'created',
  },
  {
    id: 2,
    content: 'Pending',
    datetime: 'ordered',
  },
  {
    id: 3,
    content: 'Confirmed',
    datetime: 'confirmed',
  },
  {
    id: 4,
    content: 'Fullfilled',
    datetime: 'fullfilled',
  },
];

const OrderDetailProgress = ({ order }) => {
  const { formatMessage } = useIntl();

  const step = {
    OPEN: 3,
    PENDING: 2,
    CONFIRMED: 1,
    FULLFILLED: 0,
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <>
      <div className="sm:hidden mt-1">
        <ul role="list" className="-mb-8 grid grid-cols-4">
          {progress.map((event, eventIdx) => (
            <li key={event.id}>
              <div className="relative pb-8">
                {eventIdx !== progress.length - 1 ? (
                  <span
                    className="absolute top-4 left-4 -ml-px h-0.5 w-full bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex flex-col justify-start space-y-3">
                  <span className="bg-slate-100 h-8 w-8 rounded-full flex items-center justify-center">
                    {/* <CheckIcon
                      className="h-5 w-5 text-white"
                      aria-hidden="true"
                    /> */}
                  </span>
                  <div className="min-w-0 flex-1 pt-1.5 flex flex-col justify-center items-start space-y-1">
                    <div className="text-sm text-gray-500">
                      {formatMessage({
                        id: `order_${event.content.toLowerCase()}`,
                        defaultMessage: `${event.content}`,
                      })}
                    </div>
                    <div className="text-sm whitespace-nowrap text-gray-500">
                      {formatDateTime(order[event.datetime], {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
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
          {/* {product.status} on <time dateTime={product.datetime}>{product.date}</time> */}
          <span className="text-sm font-medium text-gray-900 capitalize">
            {order.status.toLowerCase()}
          </span>
          &nbsp;on&nbsp;
          <time>
            {formatDateTime(order.fullfilled, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </time>
        </p>
        <div className="mt-2" aria-hidden="true">
          <div className="bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-2 bg-indigo-600 rounded-full"
              style={{
                width: `calc((${step[order.status]} * 2 + 1) / 8 * 100%)`,
              }}
            />
          </div>

          <div className="hidden sm:grid grid-cols-4 text-sm font-medium text-gray-600 mt-2">
            <div className="text-indigo-600">
              {formatMessage({
                id: 'order_open',
                defaultMessage: 'Open',
              })}
            </div>
            <div
              className={classNames(
                step[order.status] > 0 ? 'text-indigo-600' : '',
                'text-center',
              )}
            >
              {formatMessage({
                id: 'order_pending',
                defaultMessage: 'Pending',
              })}
            </div>
            <div
              className={classNames(
                step[order.status] > 1 ? 'text-indigo-600' : '',
                'text-center',
              )}
            >
              {formatMessage({
                id: 'order_confirmed',
                defaultMessage: 'Confirmed',
              })}
            </div>
            <div
              className={classNames(
                step[order.status] > 2 ? 'text-indigo-600' : '',
                'text-right',
              )}
            >
              {formatMessage({
                id: 'order_fullfilled',
                defaultMessage: 'Fullfilled',
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailProgress;
