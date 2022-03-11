import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import OrderDetailItem from './OrderDetailItem';
import LogList from './LogList';
import OrderDetailBilling from './OrderDetailBilling';
import DocumentList from './DocumentList';
import OrderDetailPayment from './OrderDetailPayment';
import OrderDetailDelivery from './OrderDetailDelivery';
import DiscountList from './DiscountList';
import useOrderStatusTypes from '../hooks/useOrderStatusTypes';

import useConfirmOrder from '../hooks/useConfirmOrder';
import useModal from '../../modal/hooks/useModal';
import AlertMessage from '../../modal/components/AlertMessage';
import StatusProgress from '../../common/components/StatusProgress';
import Header from '../../common/components/Header';

const OrderDetail = ({ order }) => {
  const { formatMessage } = useIntl();
  const { setModal } = useModal();
  const { confirmOrder } = useConfirmOrder();

  const { orderStatusType } = useOrderStatusTypes();

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
          className="-ml-px relative inline-flex items-center space-x-2 px-2 py-1 border border-indigo-500 text-sm font-medium rounded-md bg-indigo-500 text-white bg-white-300 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-indigo-500 focus:border-indigo-500"
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

  return (
    <>
      <Header name="order" data={order} />

      <StatusProgress
        data={order}
        statusTypes={orderStatusType}
        timeline={timeline}
      />

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
      <DocumentList documents={order.documents} />
      <LogList logs={order.logs} user={order.user} />
    </>
  );
};

export default OrderDetail;
