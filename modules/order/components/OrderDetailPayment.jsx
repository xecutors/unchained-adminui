import { useIntl } from 'react-intl';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/solid';
import { toast } from 'react-toastify';

import AlertMessage from '../../modal/components/AlertMessage';
import useModal from '../../modal/hooks/useModal';
import usePayOrder from '../hooks/usePayOrder';
import { getInterfaceLabel, useFormatPrice } from '../../common/utils/utils';
import usePaymentProviderTypes from '../../payment-providers/hooks/usePaymentProviderTypes';
import usePaymentStatusTypes from '../../payment-providers/hooks/usePaymentStatusTypes';
import useFormatDateTime from '../../common/utils/useFormatDateTime';

const OrderDetailPayment = ({ order }) => {
  const { paymentProviderType } = usePaymentProviderTypes();
  const { paymentStatusTypes } = usePaymentStatusTypes();
  const { formatDateTime } = useFormatDateTime();
  const { formatPrice } = useFormatPrice();

  const { formatMessage } = useIntl();
  const { setModal } = useModal();
  const { payOrder } = usePayOrder();

  const handleOnClick = async () => {
    await setModal(
      <AlertMessage
        buttonText={formatMessage({
          id: 'order_payment_confirmation',
          defaultMessage: 'PAY',
        })}
        headerText={formatMessage({
          id: 'order_payment_confirmation',
          defaultMessage: 'Payment',
        })}
        onOkClick={async () => {
          setModal('');
          await payOrder({ orderId: order._id });
          toast.success(
            formatMessage(
              {
                id: 'order_payed',
                defaultMessage: 'Order {id} payed successfully',
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

  const StatusInformation = ({ enumType, currentType, label, component }) => {
    return (
      component || (
        <span
          title={label}
          className={`${
            currentType === enumType ? 'bg-teal-500 text-white' : ''
          } inline-flex items-center px-2 py-1 rounded-md border border-gray-300 bg-white text-xs font-normal mr-2`}
        >
          {enumType}
        </span>
      )
    );
  };

  return (
    <div className="p-2 border border-gray-200 bg-gray-100 rounded-lg shadow-sm sm:flex-auto">
      <div className="font-medium text-gray-900 border-b pb-2 text-center">
        {formatMessage({
          id: 'payment_information',
          defaultMessage: 'Payment information',
        })}
      </div>
      <div className="mt-3">
        <div className="-ml-4 -mt-4 flex flex-wrap">
          <div className="ml-4 mt-4 w-full">
            <span className="block">
              <Link href={`/payment-provider/${order.payment.provider._id}`}>
                <a className="text-blue-600 text-base font-bold">
                  {getInterfaceLabel(order.payment?.provider?.interface)}
                </a>
              </Link>
            </span>
            <div className="pb-1 border border-x-0 border-t-0 border-gray-300 text-sm font-normal my-1">
              {formatMessage({
                id: 'payment_provider',
                defaultMessage: 'Payment',
              })}
            </div>
            <span className="block c py-1 text-xs leading-5 font-semibold rounded-full mr-2">
              {paymentProviderType.map((type) => (
                <StatusInformation
                  key={type.value}
                  enumType={type.value}
                  currentType={order.payment?.provider?.type}
                  label={type.label}
                />
              ))}
            </span>
            <div className="pb-1 border border-x-0 border-t-0 border-gray-300 text-sm font-normal my-1">
              {formatMessage({
                id: 'delivery_status',
                defaultMessage: 'Status',
              })}
            </div>
            <span className="block text-gray-900 py-1 text-xs leading-5 font-semibold rounded-full mr-2">
              {paymentStatusTypes.map((type) => (
                <StatusInformation
                  key={type.value}
                  enumType={type.value}
                  currentType={order.payment?.status}
                  label={type.label}
                  component={
                    order.payment.status === 'OPEN' &&
                    type.value === 'PAID' && (
                      <button
                        type="button"
                        onClick={handleOnClick}
                        className="inline-flex  border-gray-300  text-xs  mr-2  justify-center items-center  my-2 bg-blue-600 text-white h-full rounded py-1 px-2 border border-transparent shadow-sm  font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                      >
                        <span className="mr-1">
                          <PlusIcon className="inline-block h-3 w-3 text-white" />
                        </span>
                        {formatMessage({
                          id: 'mark_as_paid',
                          defaultMessage: 'Mark as Paid',
                        })}
                      </button>
                    )
                  }
                />
              ))}
            </span>
            {order.payment.fee ? (
              <>
                <div className="pb-1 border border-x-0 border-t-0 border-gray-300 text-sm font-normal my-1">
                  {formatMessage({
                    id: 'payment_fee',
                    defaultMessage: 'Fee',
                  })}
                </div>
                <span className="block py-1 text-xs leading-5 font-semibold rounded-full mr-2">
                  {formatPrice(order.payment.fee)}
                </span>
              </>
            ) : null}

            {order.payment.paid ? (
              <span className="block  py-2 text-sm leading-5 font-bold">
                {formatDateTime(order.payment?.delivered)}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPayment;
