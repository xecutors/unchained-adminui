import { useIntl } from 'react-intl';
import { CheckIcon } from '@heroicons/react/solid';

import { toast } from 'react-toastify';
import { formatDateTime } from '../../common/utils/utils';
import useConfirmOrder from '../hooks/useConfirmOrder';
import useModal from '../../modal/hooks/useModal';
import AlertMessage from '../../modal/components/AlertMessage';

const OrderDetailProgress = ({ order }) => {
  const { formatMessage } = useIntl();
  const { setModal } = useModal();
  const { confirmOrder } = useConfirmOrder();

  const onConfirmOrder = async () => {
    await setModal(
      <AlertMessage
        buttonText={formatMessage({
          id: 'confirm_order_alert_button',
          defaultMessage: 'Confirm',
        })}
        headerText={formatMessage({
          id: 'confirm_order_alert_header',
          defaultMessage: 'Confirm order?',
        })}
        onOkClick={async () => {
          setModal('');
          await confirmOrder({ orderId: order._id });
          toast.success(
            formatMessage(
              {
                id: 'order_confirmed_success',
                defaultMessage: 'Order {id} confirmed successfully',
              },
              {
                id: order?._id,
              },
            ),
          );
        }}
      />,
    );
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  const timeline = {
    OPEN: {
      id: 1,
      content: 'created',
    },
    PENDING: {
      id: 2,
      content: 'ordered',
      Component: order?.status === 'OPEN' && (
        <button
          onClick={onConfirmOrder}
          type="button"
          className="-ml-px relative inline-flex items-center space-x-2 px-2 py-1 border border-indigo-500 text-sm font-medium rounded-r-md bg-indigo-500 text-white bg-white-300 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-indigo-500 focus:border-indigo-500"
        >
          {formatMessage({
            id: 'confirm_order',
            defaultMessage: 'Confirm order',
          })}{' '}
        </button>
      ),
    },
    CONFIRMED: {
      id: 3,
      content: 'confirmed',
    },
    FULLFILLED: {
      id: 4,
      content: 'fullfilled',
    },
  };
  const { content } = timeline[order.status];
  return (
    <>
      <div className="flow-root sm:hidden">
        <ul className="my-4">
          {Object.entries(timeline).map(([status, event], index) => (
            <li key={status}>
              <div className="relative pb-8">
                {index !== Object.keys(timeline).length - 1 ? (
                  <span
                    className={classNames(
                      timeline[order.status].id > event.id - 0
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
                        timeline[order.status].id > event.id - 1
                          ? 'bg-indigo-600'
                          : 'bg-gray-600',
                        'h-5 w-5 rounded-full flex items-center justify-center',
                      )}
                    >
                      {timeline[order.status].id > event.id - 1 ? (
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
                          {status} {event?.Component && event.Component}
                        </span>
                      </p>
                    </div>
                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                      {order[event.content]
                        ? formatDateTime(order[event.content])
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
        <h4 className="sr-only">
          {formatMessage({
            id: 'status',
            defaultMessage: 'Status',
            description: 'Order status',
          })}
        </h4>
        <p className="text-sm font-medium text-gray-900">
          <span className="text-sm font-medium text-gray-900 capitalize">
            {order.status.toLowerCase()}
          </span>
          &nbsp;on&nbsp;
          <span>
            {order[content] ? formatDateTime(order[content]) : `In the cart`}
          </span>
        </p>
        <div className="mt-2" aria-hidden="true">
          <div className="bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-2 bg-indigo-600 rounded-full"
              style={{
                width: `calc((${timeline[order.status].id} * 2) / 8 * 100%)`,
              }}
            />
          </div>

          <div className="hidden sm:grid grid-cols-4 text-sm font-medium text-gray-600 mt-2">
            {Object.entries(timeline).map(([status, event]) => (
              <div
                key={`${status}${event.id}`}
                className={classNames(
                  timeline[order.status].id > event.id - 1
                    ? 'text-indigo-600'
                    : '',
                  'text-center',
                )}
              >
                <span className="capitalize">
                  {status} {event?.Component && event.Component}{' '}
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
