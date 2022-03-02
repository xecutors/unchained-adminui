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
        Billing Summary
      </h2>

      <div className="bg-gray-100 py-4 px-4 sm:rounded-lg lg:grid lg:grid-cols-12 lg:gap-x-8">
        <dl className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:col-span-7">
          <div>
            <dt className="font-medium text-gray-900">
              {formatMessage({
                id: 'billing_address',
                defaultMessage: 'Billing address',
              })}
            </dt>
            <dd className="mt-3 text-gray-500">
              <span className="block">
                {formatMessage({
                  id: 'name',
                  defaultMessage: `${
                    order.billingAddress.firstName ||
                    order.billingAddress.lastName
                  }`,
                })}
              </span>
              <span className="inline-block">
                {formatMessage({
                  id: 'postal_code',
                  defaultMessage: `${order.billingAddress.postalCode},`,
                })}
              </span>
              &nbsp;
              <span className="inline-block">
                {formatMessage({
                  id: 'address',
                  defaultMessage: `${order.billingAddress.addressLine}`,
                })}
              </span>
              <span className="block">
                {formatMessage({
                  id: 'city',
                  defaultMessage: `${order.billingAddress.city}, `,
                })}
              </span>
              <span className="inline-block">
                {formatMessage({
                  id: 'country',
                  defaultMessage: `${order.country.name}, ${order.country.flagEmoji}`,
                })}
              </span>
            </dd>
          </div>
        </dl>

        <dl className="mt-8 divide-y divide-gray-200 text-sm lg:mt-0 lg:col-span-5">
          <div className="pb-2 flex items-center justify-between">
            <dt className="text-gray-600">
              {formatMessage({
                id: 'subtotal',
                defaultMessage: 'Subtotal',
              })}
            </dt>
            <dd className="font-medium text-gray-900">
              {formatMessage({
                id: 'subtotal',
                defaultMessage: `${getCurrencyAndPrice(order.total)}`,
              })}
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
              {formatMessage({
                id: 'shipping',
                defaultMessage: `${order.delivery.amount || 0} `,
              })}
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
              {formatMessage({
                id: 'tax',
                defaultMessage: `${order.delivery.isTaxable || 0}`,
              })}
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
