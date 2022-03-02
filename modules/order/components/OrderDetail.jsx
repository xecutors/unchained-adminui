import { useIntl } from 'react-intl';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/solid';
import { toast } from 'react-toastify';

import OrderDetailItem from './OrderDetailItem';
import OrderDetailProgress from './OrderDetailProgress';
import LogList from './LogList';
import DiscountList from './DiscountList';
import Badge from '../../common/components/Badge';
import OrderDetailHeader from './OrderDetailHeader';
import OrderDetailBilling from './OrderDetailBilling';
import DocumentList from './DocumentList';
import AlertMessage from '../../modal/components/AlertMessage';
import useModal from '../../modal/hooks/useModal';
import usePayOrder from '../hooks/usePayOrder';
import {
  getCurrencyAndPrice,
  getInterfaceLabel,
  formatDateTime,
} from '../../common/utils/utils';

const deliveryHelper = {
  OPEN: 'green',
  DELIVERED: 'lime',
  PAID: 'lime',
  RETURNED: 'red',
  REFUNDED: 'red',
  PICKUP: 'yellow',
  SHIPPING: 'purple',
  NORMAL: 'indigo',
  DISCRETE: 'blue',
  CARD: 'teal',
  INVOICE: 'amber',
  GENERIC: 'brown',
};

const OrderDetail = ({ order }) => {
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

        <div className="bg-gray-100 p-4 sm:rounded-lg lg:grid lg:grid-cols-12 lg:gap-x-8">
          <dl className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:col-span-7">
            <div>
              <dt className="font-medium text-gray-900">
                {formatMessage({
                  id: 'billing_address',
                  defaultMessage: 'Delivery Information',
                })}
              </dt>
              <dd className="mt-3 text-gray-500">
                <span className="block">
                  <Link href="/delivery-provider">
                    <a className="text-blue-600">
                      {getInterfaceLabel(order.delivery?.provider?.interface)}
                    </a>
                  </Link>
                </span>
                <span className="inline-block py-1 text-xs leading-5 font-semibold rounded-full mr-2">
                  <Badge
                    text={order.delivery?.provider?.type}
                    color={deliveryHelper[order.delivery?.provider?.type]}
                    square
                  />
                </span>
                <span className="inline-block py-1 text-xs leading-5 font-semibold rounded-full mr-2">
                  <Badge
                    text={order.delivery?.wrapping}
                    color={deliveryHelper[order.delivery?.wrapping]}
                    square
                  />
                </span>
                <span className="block py-1 text-xs leading-5 font-semibold rounded-full mr-2">
                  <Badge
                    text={order.delivery?.status}
                    color={deliveryHelper[order.delivery?.status]}
                    square
                  />
                </span>
                {order.delivery.fee ? (
                  <span className="block py-1 text-xs leading-5 font-semibold rounded-full mr-2">
                    <Badge
                      text={getCurrencyAndPrice(order.delivery.fee)}
                      color="cyan"
                      square
                    />
                  </span>
                ) : null}
                {order.delivery?.delivered ? (
                  <span className="block py-1 text-xs leading-5 font-semibold rounded-full">
                    <Badge
                      text={formatDateTime(order.delivery?.delivered)}
                      color="orange"
                      square
                    />
                  </span>
                ) : null}
              </dd>
            </div>

            <div>
              <dt className="font-medium text-gray-900">
                {formatMessage({
                  id: 'payment_information',
                  defaultMessage: 'Payment information',
                })}
              </dt>
              <div className="mt-3">
                <dd className="-ml-4 -mt-4 flex flex-wrap">
                  <div className="ml-4 mt-4">
                    <span className="block">
                      <Link href="/payment-provider">
                        <a className="text-blue-600">
                          {getInterfaceLabel(
                            order.payment?.provider?.interface,
                          )}
                        </a>
                      </Link>
                    </span>
                    <span className="text-gray-900 inline-block py-1 text-xs leading-5 font-semibold rounded-full mr-2">
                      <Badge
                        text={order.payment?.provider?.type}
                        color={deliveryHelper[order.payment?.provider?.type]}
                        square
                      />
                    </span>
                    <span className="flex justify-center items-center text-gray-900 py-1 text-xs leading-5 font-semibold rounded-full mr-2">
                      <Badge
                        text={order.payment.status}
                        color={deliveryHelper[order.payment.status]}
                        square
                      />
                      {order.payment.status == 'OPEN' ? (
                        <button
                          type="button"
                          onClick={handleOnClick}
                          className="flex justify-center items-center ml-2 bg-blue-600 text-white my-auto h-full rounded p-1 px-2 border border-transparent shadow-sm text-sm font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                        >
                          <span className="mr-1">
                            <PlusIcon className="inline-block h-3 w-3" />
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

                    {order.payment?.delivered ? (
                      <span className="block py-1 text-xs leading-5 font-semibold rounded-full">
                        <Badge
                          text={formatDateTime(order.payment?.delivered)}
                          color="orange"
                          square
                        />
                      </span>
                    ) : null}
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

      {order.logs?.length ? (
        <LogList logs={order.logs} user={order.user} />
      ) : null}
      {order.documents?.length ? (
        <DocumentList documents={order.documents} />
      ) : null}
    </>
  );
};

export default OrderDetail;
