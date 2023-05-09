import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import OrderDetailItem from './OrderDetailItem';

import OrderDetailBilling from './OrderDetailBilling';
import OrderDetailPayment from './OrderDetailPayment';
import OrderDetailDelivery from './OrderDetailDelivery';
import DiscountList from './DiscountList';
import useOrderStatusTypes from '../hooks/useOrderStatusTypes';

import useConfirmOrder from '../hooks/useConfirmOrder';
import useModal from '../../modal/hooks/useModal';
import AlertMessage from '../../modal/components/AlertMessage';
import StatusProgress from '../../common/components/StatusProgress';
import OrderDetailHeader from './OrderDetailHeader';
import useRejectOrder from '../hooks/useRejectOrder';
import DangerMessage from '../../modal/components/DangerMessage';

const isWaitingForConfirmation = (order) => {
  return order?.status === 'PENDING';
};

const OrderDetail = ({ order }) => {
  const { formatMessage } = useIntl();
  const { setModal } = useModal();
  const { confirmOrder } = useConfirmOrder();
  const { rejectOrder } = useRejectOrder();

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
            formatMessage({
              id: 'order_confirmed_success',
              defaultMessage: 'Order confirmed successfully',
            }),
          );
        }}
      />,
    );
  };

  const onRejectOrder = async () => {
    await setModal(
      <DangerMessage
        buttonText={formatMessage({
          id: 'reject_order_alert_button',
          defaultMessage: 'Reject',
        })}
        headerText={formatMessage({
          id: 'reject_order_alert_header',
          defaultMessage: 'Reject order?',
        })}
        onOkClick={async () => {
          setModal('');
          await rejectOrder({ orderId: order._id });
          toast.success(
            formatMessage({
              id: 'order_reject_success',
              defaultMessage: 'Order rejected successfully',
            }),
          );
        }}
      />,
    );
  };

  const timeline = {
    OPEN: {
      id: 1,
      content: 'created',
      visible: true,
    },
    PENDING: {
      id: 2,
      content: 'ordered',
      Component: isWaitingForConfirmation(order) && (
        <>
          <button
            id="confirm_order"
            onClick={onConfirmOrder}
            type="button"
            className="bg-white-300 relative -ml-px inline-flex items-center space-x-2 rounded-md border border-indigo-500 bg-indigo-500 px-2 py-1 text-sm font-medium text-white hover:bg-indigo-700 focus:border-indigo-400 focus:outline-none focus:ring-0 focus:ring-indigo-400"
          >
            {formatMessage({
              id: 'confirm_order',
              defaultMessage: 'Confirm order',
            })}{' '}
          </button>
          <button
            id="reject_order"
            onClick={onRejectOrder}
            type="button"
            className="bg-white-300 relative -ml-px inline-flex items-center space-x-2 rounded-md border border-red-500 bg-red-500 px-2 py-1 text-sm font-medium text-white hover:bg-red-700 focus:border-red-400 focus:outline-none focus:ring-0 focus:ring-red-400"
          >
            {formatMessage({
              id: 'reject_order',
              defaultMessage: 'Reject order',
            })}{' '}
          </button>
        </>
      ),
      visible: true,
    },
    REJECTED: {
      id: 3,
      content: 'rejected',
      visible: order?.status === 'REJECTED',
    },
    CONFIRMED: {
      id: 4,
      content: 'confirmed',
      visible: order?.status !== 'REJECTED',
    },
    FULLFILLED: {
      id: 5,
      content: 'fullfilled',
      visible: order?.status !== 'REJECTED',
    },
  };

  return (
    <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-10 md:mt-10 dark:text-slate-200">
      <div>
        <OrderDetailHeader order={order} />
      </div>
      <div className="lg:col-span-2">
        <OrderDetailBilling order={order} />
      </div>

      <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-4 shadow dark:shadow-none rounded-md">
        <StatusProgress
          data={order}
          statusTypes={orderStatusType}
          timeline={timeline}
        />
      </div>

      <div>
        {order?.items.map((item) => {
          return <OrderDetailItem key={item._id} item={item} />;
        })}
      </div>
      <div>
        <OrderDetailDelivery order={order} />
      </div>
      <div>
        <OrderDetailPayment order={order} />
      </div>
      <div>
        <DiscountList discounts={order?.discounts} />
      </div>
    </div>
  );
};

export default OrderDetail;
