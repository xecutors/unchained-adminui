import { useIntl } from 'react-intl';

import {
  getCurrencyAndPrice,
  getTotalDiscount,
} from '../../common/utils/utils';

const OrderDetailBilling = ({ order }) => {
  const { formatMessage } = useIntl();

  return (
    <section aria-labelledby="summary-heading" className="mt-4">
      <h2 id="summary-heading" className="sr-only">
        {formatMessage({
          id: 'billing_summary',
          defaultMessage: 'Billing Summary',
        })}
      </h2>

      <div className="bg-gray-100 py-4 px-4 sm:rounded-lg md:grid md:grid-cols-2 lg:gap-x-8">
        <dl className="grid justify-center md:justify-start sm:items-center md:gap-x-8 text-sm ">
          <dt className="font-medium text-gray-900">
            {formatMessage({
              id: 'billing_address',
              defaultMessage: 'Billing address',
            })}
          </dt>
          <dd className="mt-3 text-gray-500 ">
            <span className="block my-1">
              {order.billingAddress.firstName || order.billingAddress.lastName}
            </span>
            <span className="inline-block my-1">
              {order.billingAddress.postalCode}
            </span>
            &nbsp;
            <span className="inline-block my-1">
              {order.billingAddress.addressLine}
            </span>
            <span className="block">{order.billingAddress.city}</span>
            <span className="inline-block my-1">
              {`${order.country.name}, ${order.country.flagEmoji}`}
            </span>
          </dd>
        </dl>

        <dl className="mt-8 divide-y divide-gray-200 text-sm lg:mt-0">
          <div className="pb-2 flex items-center justify-between">
            <dt className="text-gray-600">
              {formatMessage({
                id: 'subtotal',
                defaultMessage: 'Subtotal',
              })}
            </dt>
            <dd className="font-medium text-gray-900">
              {getCurrencyAndPrice(order.total)}
            </dd>
          </div>
          <div className="py-2 flex items-center justify-between">
            <dt className="text-gray-600">
              {formatMessage({
                id: 'discount',
                defaultMessage: 'Discount',
              })}
            </dt>
            <dd className="font-medium text-gray-900">
              {getTotalDiscount(order.discounts)}
            </dd>
          </div>
          <div className="py-2 flex items-center justify-between">
            <dt className="text-gray-600">
              {formatMessage({
                id: 'shipping',
                defaultMessage: 'Shipping',
              })}
            </dt>
            <dd className="font-medium text-gray-900">
              {order.delivery.amount || 0}
            </dd>
          </div>
          <div className="py-2 flex items-center justify-between">
            <dt className="text-gray-600">
              {formatMessage({
                id: 'tax',
                defaultMessage: 'Tax',
              })}
            </dt>
            <dd className="font-medium text-gray-900">
              {order.delivery.isTaxable || 0}
            </dd>
          </div>
          <div className="pt-2 flex items-center justify-between">
            <dt className="font-medium text-gray-900">
              {formatMessage({
                id: 'total',
                defaultMessage: 'Order total',
              })}
            </dt>
            <dd className="font-medium text-indigo-600">
              {getCurrencyAndPrice(order.total)}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
};

export default OrderDetailBilling;
