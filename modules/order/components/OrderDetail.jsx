import { useIntl } from 'react-intl';

import OrderDetailItem from './OrderDetailItem';
import OrderDetailProgress from './OrderDetailProgress';
import LogList from './LogList';
import OrderDetailHeader from './OrderDetailHeader';
import OrderDetailBilling from './OrderDetailBilling';
import DocumentList from './DocumentList';
import OrderDetailPayment from './OrderDetailPayment';
import OrderDetailDelivery from './OrderDetailDelivery';
import DiscountList from './DiscountList';

const OrderDetail = ({ order }) => {
  const { formatMessage } = useIntl();


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
          {formatMessage({
            id: 'delivery_payment_discount_summary',
            defaultMessage: 'Delivery, Payment and Discount Summary',
          })}
        </h2>

        <div className="grid sm:flex gap-4 sm:flex-wrap text-sm w-full sm:rounded-lg">
          <OrderDetailDelivery delivery={order.delivery} />

          <OrderDetailPayment order={order} />

          <DiscountList discount={order.discounts} />
        </div>
      </section>

      <OrderDetailBilling order={order} />

      <LogList logs={order.logs} user={order.user} />
      <DocumentList documents={order.documents} />
    </>
  );
};

export default OrderDetail;
