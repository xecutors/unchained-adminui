import { useIntl } from 'react-intl';
import { useFormatPrice } from '../../common/utils/utils';

const OrderDetailBilling = ({ order }) => {
  const { formatMessage } = useIntl();
  const { formatPrice, calculateTotalDiscount } = useFormatPrice();

  return (
    <section aria-labelledby="summary-heading" className="mt-4">
      <h2 id="summary-heading" className="sr-only">
        {formatMessage({
          id: 'billing_summary',
          defaultMessage: 'Billing Summary',
        })}
      </h2>

      <div className="bg-white py-4 px-4 shadow sm:rounded-lg md:grid md:grid-cols-2 lg:gap-x-8">
        <dl className="grid justify-center text-sm sm:items-center md:justify-start md:gap-x-8 ">
          <dt className="font-medium text-gray-900">
            {formatMessage({
              id: 'billing_address',
              defaultMessage: 'Billing address',
            })}
          </dt>
          <dd className="mt-3 text-gray-500 ">
            <span className="my-1 block">
              {order.billingAddress.firstName || order.billingAddress.lastName}
            </span>
            <span className="my-1 inline-block">
              {order.billingAddress.postalCode}
            </span>
            &nbsp;
            <span className="my-1 inline-block">
              {order.billingAddress.addressLine}
            </span>
            <span className="block">{order.billingAddress.city}</span>
            <span className="my-1 inline-block">
              {`${order.country.name}, ${order.country.flagEmoji}`}
            </span>
          </dd>
        </dl>

        <dl className="mt-8 divide-y divide-gray-200 text-sm lg:mt-0">
          <div className="flex items-center justify-between pb-2">
            <dt className="text-gray-600">
              {formatMessage({
                id: 'subtotal',
                defaultMessage: 'Subtotal',
              })}
            </dt>
            <dd className="font-medium text-gray-900">
              {formatPrice(order.total)}
            </dd>
          </div>
          <div className="flex items-center justify-between py-2">
            <dt className="text-gray-600">
              {formatMessage({
                id: 'discount',
                defaultMessage: 'Discount',
              })}
            </dt>
            <dd className="font-medium text-gray-900">
              {calculateTotalDiscount(order.discounts)}
            </dd>
          </div>
          <div className="flex items-center justify-between py-2">
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
          <div className="flex items-center justify-between py-2">
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
          <div className="flex items-center justify-between pt-2">
            <dt className="font-medium text-gray-900">
              {formatMessage({
                id: 'order_total',
                defaultMessage: 'Order total',
              })}
            </dt>
            <dd className="font-medium text-indigo-600">
              {formatPrice(order.total)}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
};

export default OrderDetailBilling;
