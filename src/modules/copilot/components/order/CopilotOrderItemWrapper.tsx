import { useIntl } from 'react-intl';
import useFormatDateTime from '../../../common/utils/useFormatDateTime';
import { useFormatPrice } from '../../../common/utils/utils';
import { OrderStatusBadge } from '../../../order/components/OrderStatusBadge';
import Link from 'next/link';

const CopilotOrderItemWrapper = ({ order, children = null }) => {
  const { formatPrice } = useFormatPrice();
  const { formatDateTime } = useFormatDateTime();
  const { formatMessage } = useIntl();

  if (!order) return children;
  return (
    <div className="relative border rounded-xl p-4 shadow-sm bg-white dark:bg-slate-900 space-y-4">
      <div className="absolute top-2 right-2 flex gap-2">
        <div className="text-lg font-semibold text-slate-900 dark:text-slate-100 whitespace-nowrap flex-shrink-0 sm:pl-4">
          {formatPrice(order?.total)}
        </div>
        <Link
          href={`/orders?orderId=${order?._id}`}
          className="px-2 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          {formatMessage({ id: 'detail', defaultMessage: 'Detail' })}
        </Link>

        <Link
          href={`/users?userId=${order?.userId}`}
          className="px-2 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          {formatMessage({ id: 'user', defaultMessage: 'User' })}
        </Link>
      </div>

      <div className="absolute top-12 right-2">
        <OrderStatusBadge status={order?.status} />
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div className="flex-1 min-w-0 space-y-1 overflow-hidden">
          <div className="text-sm font-semibold text-slate-900 dark:text-white truncate">
            {formatMessage({ id: 'order_number', defaultMessage: 'Order #' })}{' '}
            {order?.orderNumber}
          </div>

          <div className="text-sm text-slate-500 dark:text-slate-400 truncate">
            {order?.billingAddress?.firstName} {order?.billingAddress?.lastName}
            {order?.billingAddress?.company &&
              ` — ${order.billingAddress.company}`}
          </div>

          <div className="text-xs text-slate-400 truncate">
            {order?.billingAddress?.city}, {order?.billingAddress?.countryCode}
          </div>

          <div className="flex flex-wrap gap-2 mt-2 text-xs text-slate-500 dark:text-slate-400">
            <span>
              {formatMessage({ id: 'ordered', defaultMessage: 'Ordered' })}:{' '}
              <strong>{formatDateTime(order?.ordered)}</strong>
            </span>
            <span>
              {formatMessage({ id: 'confirmed', defaultMessage: 'Confirmed' })}:{' '}
              <strong>{formatDateTime(order?.confirmed)}</strong>
            </span>
            {order?.fullfilled && (
              <span>
                {formatMessage({
                  id: 'fulfilled',
                  defaultMessage: 'Fulfilled',
                })}
                : <strong>{formatDateTime(order?.fullfilled)}</strong>
              </span>
            )}
          </div>
        </div>
      </div>

      {children && (
        <div className="pt-2">
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg shadow-inner border border-slate-200 dark:border-slate-700">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default CopilotOrderItemWrapper;
