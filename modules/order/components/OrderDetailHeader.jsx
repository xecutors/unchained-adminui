import Image from 'next/image';
import { useIntl } from 'react-intl';
import {
  CheckCircleIcon,
  AtSymbolIcon,
  XCircleIcon,
  DeviceMobileIcon,
} from '@heroicons/react/solid';
import useFormatDateTime from '../../common/utils/useFormatDateTime';
import defaultNextImageLoader from '../../common/utils/defaultNextImageLoader';
import Badge from '../../common/components/Badge';

const FallbackAvatar = ({ username }) => {
  return (
    <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-500">
      <span className="text-4xl font-medium leading-none text-white">
        {username?.slice(0, 2)}
      </span>
    </span>
  );
};

const OrderDetailHeader = ({ order, button }) => {
  const { formatMessage, locale } = useIntl();

  const { formatDateTime } = useFormatDateTime();

  return (
    <>
      <div className="mt-6 mb-8 flex items-center">
        <span className="hidden h-16 w-16 rounded-full sm:block">
          {order?.user?.avatar ? (
            <Image
              loader={defaultNextImageLoader}
              src={order.user.avatar.url}
              alt={order.user.name || order.user.username}
              width={64}
              height={64}
            />
          ) : (
            <FallbackAvatar username={order?.user?.username} />
          )}
        </span>
        <div>
          <div className="flex items-center">
            <span className="block h-16 w-16 rounded-full sm:hidden">
              {order?.user?.avatar ? (
                <Image
                  loader={defaultNextImageLoader}
                  src={order.user.avatar.url}
                  alt={order.user.name || order.user.username}
                  width={64}
                  height={64}
                />
              ) : (
                <FallbackAvatar username={order?.user?.username} />
              )}
            </span>
            <span className="flex items-center">
              <h3 className="ml-3 text-2xl font-bold capitalize leading-7 text-gray-900 sm:truncate sm:leading-9">
                {order?.user?.name ? order.user.name : order?.user?.username}
              </h3>
              {order?.user?.primaryEmail?.verified ? (
                <dl className="self-end">
                  <dt className="sr-only">
                    {formatMessage({
                      id: 'account_status',
                      defaultMessage: 'Account status',
                    })}
                  </dt>
                  <dd className="mt-3 flex items-center self-end text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0">
                    {order.user?.primaryEmail?.verified ? (
                      <CheckCircleIcon
                        className="mb-1.5 h-4 w-4 flex-shrink-0 text-green-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <XCircleIcon
                        className="mb-1.5 h-4 w-4 flex-shrink-0 text-red-400"
                        aria-hidden="true"
                      />
                    )}
                  </dd>
                </dl>
              ) : null}
            </span>
          </div>
          <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
            {order?.contact?.emailAddress ? (
              <>
                <dt className="sr-only">
                  {formatMessage({ id: 'email', defaultMessage: 'Email' })}
                </dt>
                <dd className="flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6">
                  <AtSymbolIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  {order.contact.emailAddress}
                </dd>
              </>
            ) : null}

            {order?.contact?.telNumber ? (
              <>
                <dt className="sr-only">
                  {formatMessage({ id: 'phone', defaultMessage: 'Phone' })}
                </dt>
                <dd className="flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6">
                  <DeviceMobileIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  {order.contact.telNumber}
                </dd>
              </>
            ) : null}
          </dl>
        </div>
      </div>

      <div className="mt-2 border-b border-gray-200 pb-2 text-sm sm:flex sm:justify-between">
        <dl className="flex items-center">
          <dt className="capitalize text-gray-500">
            {formatMessage({
              id: 'order_number',
              defaultMessage: 'Order#',
            })}
            &nbsp;
          </dt>
          <dd className="text-xl font-bold text-gray-900">
            {order.orderNumber ? (
              <Badge
                text={order.orderNumber}
                className="bg-blue-600 p-1 text-xl font-bold"
              />
            ) : (
              <Badge
                text="Cart"
                color="yellow"
                className="p-1 text-xl font-bold"
              />
            )}
          </dd>
          <dt>
            <span className="sr-only">
              {formatMessage({ id: 'date', defaultMessage: 'Date' })}
            </span>
            <span className="mx-2 text-gray-400" aria-hidden="true">
              &middot;
            </span>
          </dt>
          <dd className="font-medium text-gray-900">
            <time dateTime="2021-03-22">
              {order?.ordered ? formatDateTime(order.ordered) : null}
            </time>
          </dd>
          {button && (
            <>
              <dt>
                <span className="sr-only">
                  {formatMessage({
                    id: 'button',
                    defaultMessage: 'Button',
                  })}
                </span>
                <span className="mx-2 text-gray-400" aria-hidden="true">
                  &middot;
                </span>
              </dt>
              <dd className="ml-6 font-medium text-gray-900">{button}</dd>
            </>
          )}
        </dl>
        <div className="flex items-center pl-2 text-base text-gray-900">
          <span>{order?.country?.flagEmoji}</span>
          <span className="ml-2">
            {new Intl.DisplayNames([locale], {
              type: 'currency',
            }).of(order?.currency?.isoCode)}
          </span>
          <span>
            {order?.currency?.isoCode && (
              <Badge
                text={order?.currency?.isoCode}
                color="amber"
                className="ml-2 px-2 py-1"
                square
              />
            )}
          </span>
        </div>
      </div>
    </>
  );
};

export default OrderDetailHeader;
