import { useIntl } from 'react-intl';
import Link from 'next/link';

import { PlusIcon } from '@heroicons/react/outline';
import { toast } from 'react-toastify';
import { getInterfaceLabel, useFormatPrice } from '../../common/utils/utils';
import useDeliveryProviderTypes from '../../delivery-provider/hooks/useDeliveryProviderTypes';
import useDeliveryStatusTypes from '../../delivery-provider/hooks/useDeliveryStatusTypes';
import useFormatDateTime from '../../common/utils/useFormatDateTime';
import AlertMessage from '../../modal/components/AlertMessage';
import useModal from '../../modal/hooks/useModal';
import useDeliverOrder from '../hooks/useDeliverOrder';
import StatusInformation from '../../common/components/StatusInformation';

const OrderDetailDelivery = ({ order }) => {
  const { deliveryProviderType } = useDeliveryProviderTypes();
  const { setModal } = useModal();
  const { deliveryStatusType } = useDeliveryStatusTypes();
  const { deliverOrder } = useDeliverOrder();
  const { formatPrice } = useFormatPrice();
  const { formatMessage } = useIntl();
  const { formatDateTime } = useFormatDateTime();

  const markAsDelivered = async () => {
    await setModal(
      <AlertMessage
        buttonText={formatMessage({
          id: 'delivered',
          defaultMessage: 'Delivered',
        })}
        headerText={formatMessage({
          id: 'mark_as_delivered_question',
          defaultMessage: 'Mark as delivered ?',
        })}
        onOkClick={async () => {
          setModal('');
          await deliverOrder({ orderId: order._id });
          toast.success(
            formatMessage({
              id: 'order__marked_delivered',
              defaultMessage: 'Order marked as delivered successfully',
            }),
          );
        }}
      />,
    );
  };

  return (
    <div className="bg-white dark:bg-slate-800 shadow dark:shadow-none sm:rounded-lg">
      <div className="flex items-center justify-between px-4 sm:px-6">
        <h2 className="py-4 text-lg font-medium">
          {formatMessage({
            id: 'delivered',
            defaultMessage: 'Delivered',
          })}
        </h2>
        {order?.delivery.fee && (
          <span className="mr-2 block rounded-full py-1 text-xs font-semibold leading-5">
            {formatPrice(order?.delivery.fee)}
          </span>
        )}
        <span className="font-medium">
          {formatDateTime(order?.delivery?.delivered, {
            timeStyle: 'short',
            dateStyle: 'medium',
          })}
        </span>
      </div>
      <div className="border-t border-indigo-50 dark:border-slate-700 px-4 py-4 sm:px-6">
        <span className="mb-5 block">
          <Link
            href={`/delivery-provider/${order?.delivery?.provider._id}`}
            className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
          >
            {getInterfaceLabel(order?.delivery?.provider?.interface)}
          </Link>
        </span>

        <div className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-200">
          {formatMessage({
            id: 'method',
            defaultMessage: 'Method',
          })}
        </div>
        <span className="mr-2 block rounded-full py-1 text-xs font-semibold leading-5">
          {deliveryProviderType.map((type) => (
            <StatusInformation
              key={type.value}
              enumType={type.value}
              currentType={order?.delivery?.provider?.type}
              label={type.label}
            />
          ))}
        </span>

        <div className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-200">
          {formatMessage({
            id: 'status',
            defaultMessage: 'Status',
          })}
        </div>
        <span className="mr-2 block rounded-full py-1 text-xs font-semibold leading-5">
          {deliveryStatusType.map((type) => (
            <StatusInformation
              key={type.value}
              enumType={type.value}
              currentType={order?.delivery?.status}
              label={type.label}
              component={
                order?.delivery?.status === 'OPEN' &&
                type.value === 'DELIVERED' && (
                  <button
                    id="deliver"
                    type="button"
                    onClick={markAsDelivered}
                    className="my-2  mr-2  inline-flex  h-full  items-center justify-center  rounded border border-slate-300 border-transparent bg-blue-600 py-1 px-2 text-xs font-semibold text-white  shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                  >
                    <span className="mr-1">
                      <PlusIcon className="inline-block h-3 w-3 text-white" />
                    </span>
                    {formatMessage({
                      id: 'mark_as_delivered',
                      defaultMessage: 'Mark as delivered',
                    })}
                  </button>
                )
              }
            />
          ))}
        </span>
      </div>
    </div>
  );
};

export default OrderDetailDelivery;
