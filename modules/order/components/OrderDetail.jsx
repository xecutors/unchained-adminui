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
  /* const getInitial=order.user.name.split(" ") */
  /* console.log(order.user.isEmailVerified ? order.user.isEmailVerified : false); */

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

      {order.items.map((item, index) => {
        return <OrderDetailItem key={index} item={item} />;
      })}
    </>
  );
};

export default OrderDetail;
