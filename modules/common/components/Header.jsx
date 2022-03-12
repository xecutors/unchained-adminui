import Image from 'next/image';
import { useIntl } from 'react-intl';
import {
  CheckCircleIcon,
  AtSymbolIcon,
  XCircleIcon,
  DeviceMobileIcon,
} from '@heroicons/react/solid';

import useFormatDateTime from '../utils/useFormatDateTime';
import Badge from './Badge';
import defaultNextImageLoader from '../utils/defaultNextImageLoader';

const FallbackAvatar = ({ username }) => {
  return (
    <span className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-500">
      <span className="text-4xl font-medium leading-none text-white">
        {username?.slice(0, 2)}
      </span>
    </span>
  );
};

const Header = ({ name, data, reject }) => {
  const { formatMessage } = useIntl();

  const { formatDateTime } = useFormatDateTime();

  return (
    <section>
      <div className="flex items-center">
        <span className="hidden h-16 w-16 rounded-full sm:block">
          {data?.user?.avatar ? (
            <Image
              loader={defaultNextImageLoader}
              src={data.user.avatar.url}
              alt={data.user.name || data.user.username}
              width={64}
              height={64}
            />
          ) : (
            <FallbackAvatar username={data?.user?.username} />
          )}
        </span>
        <div>
          <div className="flex items-center">
            <span className="block h-16 w-16 rounded-full sm:hidden">
              {data?.user?.avatar ? (
                <Image
                  loader={defaultNextImageLoader}
                  src={data.user.avatar.url}
                  alt={data.user.name || data.user.username}
                  width={64}
                  height={64}
                />
              ) : (
                <FallbackAvatar username={data?.user?.username} />
              )}
            </span>
            <span className="flex items-center">
              <h3 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate capitalize">
                {data?.user?.name ? data.user.name : data?.user?.username}
              </h3>
              {data?.user?.primaryEmail?.verified ? (
                <dl className="self-end">
                  <dt className="sr-only">
                    {formatMessage({
                      id: 'account_status',
                      defaultMessage: 'Account status',
                    })}
                  </dt>
                  <dd className="mt-3 flex items-center self-end text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                    {data.user?.primaryEmail?.verified ? (
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
              ) : null}
            </span>
          </div>
          <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
            {data?.contact?.emailAddress ? (
              <>
                <dt className="sr-only">
                  {formatMessage({ id: 'email', defaultMessage: 'Email' })}
                </dt>
                <dd className="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6">
                  <AtSymbolIcon
                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  {data.contact.emailAddress}
                </dd>
              </>
            ) : null}

            {data?.contact?.telNumber ? (
              <>
                <dt className="sr-only">
                  {formatMessage({ id: 'phone', defaultMessage: 'Phone' })}
                </dt>
                <dd className="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6">
                  <DeviceMobileIcon
                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  {data.contact.telNumber}
                </dd>
              </>
            ) : null}
          </dl>
        </div>
      </div>

      <div className="text-sm border-b border-gray-200 mt-2 pb-2 sm:flex sm:justify-between">
        <dl className="flex items-center">
          <dt className="text-gray-500 capitalize">
            {formatMessage({
              id: `${name}`,
              defaultMessage: `${name}`,
            })}
            &#35; &nbsp;
          </dt>
          <dd className="font-bold text-xl text-gray-900">
            {data?.orderNumber ? (
              <Badge
                text={data.orderNumber}
                className="p-1 bg-blue-600 font-bold text-xl"
              />
            ) : (
              <Badge
                text="Cart"
                color="yellow"
                className="p-1 font-bold text-xl"
              />
            )}
          </dd>
          <dt>
            <span className="sr-only">
              {formatMessage({ id: 'date', defaultMessage: 'Date' })}
            </span>
            <span className="text-gray-400 mx-2" aria-hidden="true">
              &middot;
            </span>
          </dt>
          <dd className="font-medium text-gray-900">
            <time dateTime="2021-03-22">
              {data?.ordered ? formatDateTime(data.ordered) : null}
            </time>
          </dd>
          {reject &&
          data.status !== 'FULLFILLED' &&
          data.status !== 'REJECTED' ? (
            <>
              <dt>
                <span className="sr-only">
                  {formatMessage({
                    id: 'reject_button',
                    defaultMessage: 'Reject',
                  })}
                </span>
                <span className="text-gray-400 mx-2" aria-hidden="true">
                  &middot;
                </span>
              </dt>
              <dd className="ml-6 font-medium text-gray-900">{reject}</dd>
            </>
          ) : null}
        </dl>
      </div>
    </section>
  );
};

export default Header;
