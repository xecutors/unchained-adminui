import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import OrderDetailItem from './OrderDetailItem';

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
import OrderDetailHeader from './OrderDetailHeader';
import Accordion from '../../common/components/Accordion';

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
      visible: true,
    },
    PENDING: {
      id: 2,
      content: 'ordered',
      Component: order?.status === 'OPEN' && (
        <button
          onClick={onConfirmOrder}
          type="button"
          className="bg-white-300 relative -ml-px inline-flex items-center space-x-2 rounded-md border border-indigo-500 bg-indigo-500 px-2 py-1 text-sm font-medium text-white hover:bg-indigo-700 focus:border-indigo-400 focus:outline-none focus:ring-0 focus:ring-indigo-400"
        >
          {formatMessage({
            id: 'confirm_order',
            defaultMessage: 'Confirm order',
          })}{' '}
        </button>
      ),
      visible: true,
    },
    CONFIRMED: {
      id: 3,
      content: 'confirmed',
      visible: true,
    },
    FULLFILLED: {
      id: 4,
      content: 'fullfilled',
      visible: true,
    },
  };

  const headerCSS =
    'inline-flex items-center justify-between w-full px-4 py-2 rounded-md border border-gray-300 bg-grey-100 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400';

  const documents = {
    header: (
      <span className="flex">
        {formatMessage({
          id: 'documents',
          defaultMessage: 'Documents',
        })}
      </span>
    ),
    body: <DocumentList documents={order?.documents || []} />,
  };

  return (
    <div className="lg:grid lg:grid-cols-3 lg:gap-10 space-y-5 md:mt-10 xl:mt-20">
      <div>
        <OrderDetailHeader order={order} />
      </div>
      <div className="lg:col-span-2">
        <OrderDetailBilling order={order} />
      </div>

      <div className="lg:col-span-2">
        <StatusProgress
          data={order}
          statusTypes={orderStatusType}
          timeline={timeline}
        />
        <div className="mt-10">
          <Accordion data={[documents]} headerCSS={headerCSS} />
        </div>
      </div>

      <div>
        {order?.items.map((item) => {
          return <OrderDetailItem key={item._id} item={item} />;
        })}
      </div>
      <div>
        <OrderDetailDelivery delivery={order?.delivery} />
      </div>
      <div>
        <OrderDetailPayment order={order} />
      </div>
      <div>
        <DiscountList discount={order?.discounts} />
      </div>
    </div>
  );
};

export default OrderDetail;
