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
          id: 'pay',
          defaultMessage: 'PAY',
        })}
        headerText={formatMessage({
          id: 'payment',
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
            currentType === enumType
              ? 'border-teal-700 bg-teal-500 text-white'
              : 'opacity-25'
          } mr-2 inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-normal`}
        >
          {enumType}
        </span>
      )
    );
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <h2 className="px-4 py-5 text-lg font-medium text-gray-900 sm:px-6">
        {formatMessage({
          id: 'payment_information',
          defaultMessage: 'Payment information',
        })}
      </h2>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <span className="mb-5  block">
          <Link href={`/payment-provider/${order.payment.provider._id}`}>
            <a className="font-medium text-blue-600 hover:text-blue-500">
              {getInterfaceLabel(order.payment?.provider?.interface)}
            </a>
          </Link>
        </span>
        <div className="mt-3 text-sm font-medium text-gray-500">
          {formatMessage({
            id: 'method',
            defaultMessage: 'Method',
          })}
        </div>
        <span className="c mr-2 block rounded-full py-1 text-xs font-semibold leading-5">
          {paymentProviderType.map((type) => (
            <StatusInformation
              key={type.value}
              enumType={type.value}
              currentType={order.payment?.provider?.type}
              label={type.label}
            />
          ))}
        </span>
        <div className="mt-3 text-sm font-medium text-gray-500">
          {formatMessage({
            id: 'delivery_status',
            defaultMessage: 'Status',
          })}
        </div>
        <span className="mr-2 block rounded-full py-1 text-xs font-semibold leading-5 text-gray-900">
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
                    className="my-2  mr-2  inline-flex  h-full  items-center justify-center  rounded border border-gray-300 border-transparent bg-blue-600 py-1 px-2 text-xs font-semibold text-white  shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
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
            <div className="my-1 border border-x-0 border-t-0 border-gray-300 pb-1 text-sm font-normal">
              {formatMessage({
                id: 'payment_fee',
                defaultMessage: 'Fee',
              })}
            </div>
            <span className="mr-2 block rounded-full py-1 text-xs font-semibold leading-5">
              {formatPrice(order.payment.fee)}
            </span>
          </>
        ) : null}

        {order.payment.paid ? (
          <span className="mt-3 block py-2 text-sm font-bold leading-5">
            {formatDateTime(order.payment.paid)}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default OrderDetailPayment;
