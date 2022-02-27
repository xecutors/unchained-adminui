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
        <dl className="flex">
          <dt className="text-gray-500">Order &num; &nbsp;</dt>
          <dd className="font-bold text-gray-900">{order.orderNumber}</dd>
          <dt>
            <span className="sr-only">Date</span>
            <span className="text-gray-400 mx-2" aria-hidden="true">
              &middot;
            </span>
          </dt>
          <dd className="font-medium text-gray-900">
            <time dateTime="2021-03-22">
              {formatDateTime(order.ordered, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </dd>
        </dl>
      </div>

      <OrderDetailProgress order={order} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
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
                  <div className="ml-4 mt-4 flex-shrink-0">
                    <svg
                      aria-hidden="true"
                      width={36}
                      height={24}
                      viewBox="0 0 36 24"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-auto"
                    >
                      <rect width={36} height={24} rx={4} fill="#224DBA" />
                      <path
                        d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z"
                        fill="#fff"
                      />
                    </svg>
                    <p className="sr-only">Visa</p>
                  </div>
                  <div className="ml-4 mt-4">
                    <p className="text-gray-900">Ending with 4242</p>
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
