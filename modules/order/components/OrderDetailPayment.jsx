import { useIntl } from 'react-intl';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/solid';
import { toast } from 'react-toastify';
import { Fragment } from 'react';

import Badge from '../../common/components/Badge';
import AlertMessage from '../../modal/components/AlertMessage';
import useModal from '../../modal/hooks/useModal';
import usePayOrder from '../hooks/usePayOrder';
import {
  getCurrencyAndPrice,
  getInterfaceLabel,
  formatDateTime,
} from '../../common/utils/utils';
import usePaymentProviderTypes from '../../payment-providers/hooks/usePaymentProviderTypes';
import usePaymentStatusTypes from '../../payment-providers/hooks/usePaymentStatusTypes';

const OrderDetailPayment = ({ order }) => {
  const { paymentProviderType } = usePaymentProviderTypes();
  const { paymentStatusTypes } = usePaymentStatusTypes();

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
          // setModal('');
          await payOrder({ orderId: order._id });
          toast.success(
            formatMessage(
              {
                id: 'order_payed',
                defaultMessage: 'Order {order._id} payed successfully',
              },
              {
                id,
              },
            ),
          );
        }}
      />,
    );
  };

  const StatusInformation = ({ enumType, currentType, label }) => {
    return (
      <span
        title={label}
        className={`${
          currentType === enumType ? 'bg-teal-500 text-white' : ''
        } inline-flex items-center px-2 py-1 rounded-md border border-gray-300 bg-white text-xs font-normal mr-2`}
      >
        {enumType}
      </span>
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
          <div className="ml-4 mt-4">
            <span className="block">
              <Link href={`/payment-provider/${order.payment.provider._id}`}>
                <a className="text-blue-600 text-base font-bold">
                  {getInterfaceLabel(order.payment?.provider?.interface)}
                </a>
              </Link>
            </span>
            <span className="block text-gray-900 py-1 text-xs leading-5 font-semibold rounded-full mr-2">
              {paymentProviderType.map((type, index) => (
                <Fragment key={index}>
                  <StatusInformation
                    enumType={type.value}
                    currentType={order.payment?.provider?.type}
                    label={type.label}
                  />
                </Fragment>
              ))}
            </span>
            <span className="block text-gray-900 py-1 text-xs leading-5 font-semibold rounded-full mr-2">
              {paymentStatusTypes.map((type, index) => (
                <Fragment key={index}>
                  <StatusInformation
                    enumType={type.value}
                    currentType={order.payment?.status}
                    label={type.label}
                  />
                </Fragment>
              ))}
              {order.payment.status == 'OPEN' ? (
                <button
                  type="button"
                  onClick={handleOnClick}
                  className="flex justify-center items-center ml-4 my-2 bg-blue-600 text-white h-full rounded py-1 px-2 border border-transparent shadow-sm text-sm font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                >
                  <span className="mr-1">
                    <PlusIcon className="inline-block h-3 w-3 text-white" />
                  </span>
                  {formatMessage({
                    id: 'order_pay',
                    defaultMessage: 'Pay',
                  })}
                </button>
              ) : null}
            </span>
            {order.payment.fee ? (
              <span className="block py-1 text-xs leading-5 font-semibold rounded-full mr-2">
                <Badge
                  text={getCurrencyAndPrice(order.payment.fee)}
                  color="cyan"
                  square
                />
              </span>
            ) : null}

            {order.payment.paid ? (
              <span className="block py-1 text-xs leading-5 font-semibold rounded-full">
                <Badge
                  text={formatDateTime(order.payment?.delivered)}
                  color="orange"
                  square
                />
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPayment;
