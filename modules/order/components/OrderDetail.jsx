import { useIntl } from 'react-intl';

import formatDateTime from '../../common/utils/formatDateTime';
import OrderDetailItem from './OrderDetailItem';
import OrderDetailProgress from './OrderDetailProgress';
import LogList from './LogList';
import DiscountList from './DiscountList';
import Badge from '../../common/components/Badge';
import OrderDetailHeader from './OrderDetailHeader';
import OrderDetailBilling from './OrderDetailBilling';
import DocumentList from './DocumentList';

const OrderDetail = ({ order }) => {
  const { formatMessage } = useIntl();

  console.log(order);

  return (
    <>
      <OrderDetailHeader order={order} />
      <OrderDetailProgress order={order} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {order.items.map((item) => {
          return <OrderDetailItem key={item._id} item={item} />;
        })}
      </div>

      <section aria-labelledby="summary-heading" className="mt-8">
        <h2 id="summary-heading" className="sr-only">
          Delivery Summary
        </h2>

        <div className="bg-gray-100 py-4 px-4 sm:rounded-lg lg:p-8 lg:grid lg:grid-cols-12 lg:gap-x-8">
          <dl className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:col-span-7">
            <div>
              <dt className="font-medium text-gray-900">
                {formatMessage({
                  id: 'billing_address',
                  defaultMessage: 'Delivery summary',
                })}
              </dt>
              <dd className="mt-3 text-gray-500">
                <span className="block">{order.delivery.wrapping}</span>
                <span className="inline-block">
                  {order.delivery.deliveryType}
                </span>
                <span className="block">
                  {formatMessage({
                    id: 'city',
                    defaultMessage: `${order.billingAddress.city}, `,
                  })}
                </span>
                <span className="inline-block">
                  {order.delivery.fee ? order.delivery.fee.amount : null}
                </span>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-gray-900">
                {' '}
                {formatMessage({
                  id: 'payment_information',
                  defaultMessage: 'Payment information',
                })}
              </dt>
              <div className="mt-3">
                <dd className="-ml-4 -mt-4 flex flex-wrap">
                  <div className="ml-4 mt-4">
                    <p className="text-gray-900 mb-2">
                      <Badge text={order.payment.provider.interface.label} />
                    </p>
                    <p className="text-gray-900 mb-2">
                      <Badge text={order.payment.provider.type} />
                    </p>
                    <p className="text-gray-900 mb-2">
                      <Badge text={order.payment.status} />
                    </p>
                  </div>
                </dd>
              </div>
            </div>
          </dl>

          {order.discounts?.length ? (
            <DiscountList discount={order.discounts} />
          ) : null}
        </div>
      </section>

      <OrderDetailBilling order={order} />

      {order.logs?.length ? <LogList logs={order.logs} /> : null}
      {order.documents?.length ? (
        <DocumentList documents={order.documents} />
      ) : null}
    </>
  );
};

export default OrderDetail;
