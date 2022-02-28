import Image from 'next/image';
import { useIntl } from 'react-intl';
import {
  CheckCircleIcon,
  AtSymbolIcon,
  XCircleIcon,
  DeviceMobileIcon,
} from '@heroicons/react/solid';

import formatDateTime from '../../common/utils/formatDateTime';
import OrderDetailItem from './OrderDetailItem';
import OrderDetailProgress from './OrderDetailProgress';
import Badge from '../../common/components/Badge';

const FallbackAvatar = ({ username, name }) => {
  return (
    <span className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-500">
      <span className="text-4xl font-medium leading-none text-white">
        {username.slice(0, 2)}
      </span>
    </span>
  );
};

const OrderDetail = ({ order }) => {
  const { formatMessage } = useIntl();

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  console.log(order);

  return (
    <>
      <div className="flex items-center">
        <span className="hidden h-16 w-16 rounded-full sm:block">
          {order.user.avatar ? (
            <Image
              src={order.user.avatar.url.baseUrl}
              alt={order.user.name || order.user.username}
              width={64}
              height={64}
            />
          ) : (
            <FallbackAvatar username={order.user.username} />
          )}
        </span>
        <div>
          <div className="flex items-center">
            <span className="block h-16 w-16 rounded-full sm:hidden">
              {order.user.avatar ? (
                <Image
                  src={order.user.avatar.url.baseUrl}
                  alt={order.user.name || order.user.username}
                  width={64}
                  height={64}
                />
              ) : (
                <FallbackAvatar username={order.user.username} />
              )}
            </span>
            <span className="flex items-center">
              <h3 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate capitalize">
                {order.user.name ? order.user.name : order.user.username}
              </h3>
              <dl className="self-end">
                <dt className="sr-only">Account status</dt>
                <dd className="mt-3 flex items-center self-end text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                  {order.user.isEmailVerified ? (
                    order.user.isEmailVerified
                  ) : false ? (
                    <CheckCircleIcon
                      className="flex-shrink-0 mb-1.5 h-4 w-4 text-green-400"
                      aria-hidden="true"
                    />
                  ) : (
                    <XCircleIcon
                      className="flex-shrink-0 mb-1.5 h-4 w-4 text-red-400"
                      aria-hidden="true"
                    />
                  )}
                </dd>
              </dl>
            </span>
          </div>
          <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
            <dt className="sr-only">Email</dt>
            <dd className="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6">
              <AtSymbolIcon
                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              {order.contact.emailAddress}
            </dd>
            {order.contact.telNumber ? (
              <>
                <dt className="sr-only">Phone</dt>
                <dd className="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6">
                  <DeviceMobileIcon
                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  {order.contact.telNumber}
                </dd>
              </>
            ) : null}
          </dl>
        </div>
      </div>

      <div className="text-sm border-b border-gray-200 mt-2 pb-2 sm:flex sm:justify-between">
        <dl className="flex items-center">
          <dt className="text-gray-500">
            {formatMessage({
              id: 'order',
              defaultMessage: 'Order',
            })}
            &#35; &nbsp;
          </dt>
          <dd className="font-bold text-xl text-gray-900">
            <Badge
              text={order.orderNumber || `In the cart`}
              className={'p-1 bg-blue-600'}
            />
          </dd>  
          <dt>
            <span className="sr-only">Date</span>
            <span className="text-gray-400 mx-2" aria-hidden="true">
              &middot;
            </span>
          </dt>
          <dd className="font-medium text-gray-900">
            <time dateTime="2021-03-22">
              {order.ordered
                ? formatDateTime(order.ordered, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : ``}
            </time> 
          </dd>
        </dl>
      </div>

      <OrderDetailProgress order={order} />

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-4">
        {order.items.map((item, index) => {
          return <OrderDetailItem key={index} item={item} />;
        })}
      </div>

      <section aria-labelledby="summary-heading" className="mt-16">
        <h2 id="summary-heading" className="sr-only">
          Billing Summary
        </h2>

        <div className="bg-gray-100 py-6 px-4 sm:px-6 sm:rounded-lg lg:px-8 lg:py-8 lg:grid lg:grid-cols-12 lg:gap-x-8">
          <dl className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:col-span-7">
            <div>
              <dt className="font-medium text-gray-900">
                {formatMessage({
                  id: 'billing_address',
                  defaultMessage: 'Billing address',
                })}
              </dt>
              <dd className="mt-3 text-gray-500">
                <span className="block">
                  {formatMessage({
                    id: 'name',
                    defaultMessage: `${
                      order.billingAddress.firstName ||
                      order.billingAddress.lastName
                    }`,
                  })}
                </span>
                <span className="block">
                  {formatMessage({
                    id: 'address',
                    defaultMessage: `${order.billingAddress.addressLine}`,
                  })}
                </span>
                <span className="block">
                  {formatMessage({
                    id: 'country',
                    defaultMessage: `${order.country.name}, ${order.country.flagEmoji}`,
                  })}
                </span>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-gray-900">Payment information</dt>
              <div className="mt-3">
                <dd className="-ml-4 -mt-4 flex flex-wrap">
                  <div className="ml-4 mt-4">
                    <p className="text-gray-900">
                      <Badge text={order.payment.provider.interface.label} />
                    </p>
                    <p className="text-gray-600">Expires 02 / 24</p>
                  </div>
                </dd>
              </div>
            </div>
          </dl>

          <dl className="mt-8 divide-y divide-gray-200 text-sm lg:mt-0 lg:col-span-5">
            <div className="pb-4 flex items-center justify-between">
              <dt className="text-gray-600">
                {formatMessage({
                  id: 'subtotal',
                  defaultMessage: 'Subtotal',
                })}
              </dt>
              <dd className="font-medium text-gray-900">
                {formatMessage({
                  id: 'subtotal',
                  defaultMessage: `${order.total.amount}`,
                })}
              </dd>
            </div>
            <div className="py-4 flex items-center justify-between">
              <dt className="text-gray-600">
                {formatMessage({
                  id: 'shipping',
                  defaultMessage: 'Shipping',
                })}
              </dt>
              <dd className="font-medium text-gray-900">
                {' '}
                {formatMessage({
                  id: 'shipping',
                  defaultMessage: `${order.total.amount}`,
                })}
              </dd>
            </div>
            <div className="py-4 flex items-center justify-between">
              <dt className="text-gray-600">
                {formatMessage({
                  id: 'tax',
                  defaultMessage: 'Tax',
                })}
              </dt>
              <dd className="font-medium text-gray-900"></dd>
            </div>
            <div className="pt-4 flex items-center justify-between">
              <dt className="font-medium text-gray-900">
                {' '}
                {formatMessage({
                  id: 'total',
                  defaultMessage: 'Order total',
                })}
              </dt>
              <dd className="font-medium text-indigo-600">$83.16</dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
};

export default OrderDetail;
