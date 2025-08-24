'use client';

import React from 'react';
import { useFormatPrice } from '../../../common/utils/utils';
import useFormatDateTime from '../../../common/utils/useFormatDateTime';
import { useIntl } from 'react-intl';
import { OrderStatusBadge } from '../../../order/components/OrderStatusBadge';
import Link from 'next/link';

export const CopilotOrderListItem = ({ order }) => {
  const { formatPrice } = useFormatPrice();
  const { formatDateTime } = useFormatDateTime();
  const { formatMessage } = useIntl();
  const itemsTotal =
    order?.calculation?.find((c) => c.category === 'ITEMS')?.amount ?? 0;

  return (
    <div
      key={order._id}
      className="border rounded-xl shadow-sm p-4 flex justify-between items-start bg-white dark:bg-zinc-900"
    >
      <div className="space-y-1">
        <div className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
          {formatMessage({
            id: 'order_number',
            defaultMessage: 'Order #',
          })}
          {order?.orderNumber ? `${order.orderNumber}` : ''}
        </div>
        <div className="text-sm text-zinc-500 dark:text-zinc-400">
          {order?.billingAddress?.firstName} {order?.billingAddress?.lastName} —{' '}
          {order.billingAddress.company}
        </div>
        <div className="text-xs text-zinc-400">
          {order?.billingAddress?.city}, {order?.billingAddress?.countryCode}
        </div>
        <div className="text-xs text-zinc-400 mt-1">
          Ordered: {formatDateTime(order?.ordered)} | Confirmed:{' '}
          {formatDateTime(order?.confirmed)}
          {order?.fullfilled && (
            <> | Fulfilled: {formatDateTime(order.fullfilled)}</>
          )}
        </div>
      </div>
      <div className="text-right">
        <div className="mb-3">
          <Link
            href={`/orders?orderId=${order?._id}`}
            className="px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            {formatMessage({ id: 'detail', defaultMessage: 'Detail' })}
          </Link>
        </div>
        <OrderStatusBadge status={order?.status} />
        <div className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          {formatPrice({
            amount: itemsTotal,
            currencyCode: order?.currencyCode,
          })}
        </div>
      </div>
    </div>
  );
};

const CopilotOrderList = ({ orders, toolCallId }) => {
  if (!orders?.length) return null;
  return (
    <div className="space-y-2">
      {orders.map((order) => (
        <CopilotOrderListItem
          order={order}
          key={`${order._id}-${toolCallId}`}
        />
      ))}
    </div>
  );
};

export default CopilotOrderList;
