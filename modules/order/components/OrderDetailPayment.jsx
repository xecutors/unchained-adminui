import { useIntl } from 'react-intl';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';

import AlertMessage from '../../modal/components/AlertMessage';
import useModal from '../../modal/hooks/useModal';
import usePayOrder from '../hooks/usePayOrder';
import { getInterfaceLabel, useFormatPrice } from '../../common/utils/utils';
import usePaymentProviderTypes from '../../payment-providers/hooks/usePaymentProviderTypes';
import usePaymentStatusTypes from '../../payment-providers/hooks/usePaymentStatusTypes';
import useFormatDateTime from '../../common/utils/useFormatDateTime';
import StatusInformation from '../../common/components/StatusInformation';

const OrderDetailPayment = ({ order }) => {
  const { paymentProviderType } = usePaymentProviderTypes();
  const { paymentStatusTypes } = usePaymentStatusTypes();
  const { formatDateTime } = useFormatDateTime();
  const { formatPrice } = useFormatPrice();

  const { formatMessage } = useIntl();
  const { setModal } = useModal();
  const { payOrder } = usePayOrder();

  const markAsPaid = async () => {
    await setModal(
      <AlertMessage
        buttonText={formatMessage({
          id: 'pay',
          defaultMessage: 'PAY',
        })}
        headerText={formatMessage({
          id: 'mark_as_paid_question',
          defaultMessage: 'Mark as paid ?',
        })}
        onOkClick={async () => {
          setModal('');
          await payOrder({ orderId: order._id });
          toast.success(
            formatMessage({
              id: 'order_paid',
              defaultMessage: 'Order payed successfully',
            }),
          );
        }}
      />,
    );
  };

  return (
    <div className="bg-white dark:bg-slate-800 shadow dark:shadow-none sm:rounded-lg">
      <div className="flex items-center justify-between px-4 sm:px-6">
        <h2 className="py-4 text-lg font-medium text-slate-900 dark:text-slate-200">
          {formatMessage({
            id: 'paid',
            defaultMessage: 'Paid',
          })}
        </h2>
        <span className="mr-2 block rounded-full py-1 text-xs font-semibold leading-5">
          {formatPrice(order.payment.fee)}
        </span>
        <span className="font-medium">
          {formatDateTime(order.payment.paid, {
            timeStyle: 'short',
            dateStyle: 'medium',
          })}
        </span>
      </div>

      <div className="border-t border-indigo-50 dark:border-slate-700 px-4 py-4 sm:px-6">
        <span className="mb-5  block">
          <Link
            href={`/payment-provider/${order.payment.provider._id}`}
            className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
          >
            {getInterfaceLabel(order.payment?.provider?.interface)}
          </Link>
        </span>
        <div className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-200">
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
        <div className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-200">
          {formatMessage({
            id: 'delivery_status',
            defaultMessage: 'Status',
          })}
        </div>
        <span className="mr-2 block rounded-full py-1 text-xs font-semibold leading-5">
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
                    id="pay"
                    type="button"
                    onClick={markAsPaid}
                    className="my-2 mr-2 inline-flex h-full items-center justify-center  rounded border border-slate-300 border-transparent bg-blue-600 py-1 px-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
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
      </div>
    </div>
  );
};

export default OrderDetailPayment;
