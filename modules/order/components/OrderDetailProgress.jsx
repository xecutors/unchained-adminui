import { useIntl } from 'react-intl';
import { CheckIcon } from '@heroicons/react/solid';

import formatDateTime from '../../common/utils/formatDateTime';

const progress = [
  // {
  //   id: 1,
  //   content: 'Open',
  //   datetime: 'created',
  // },
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
      <div className="border-t border-gray-200 py-2 px-2 sm:px-2 lg:p-2">
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
