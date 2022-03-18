import Image from 'next/image';
import { useIntl } from 'react-intl';
import {
  CheckCircleIcon,
  AtSymbolIcon,
  XCircleIcon,
  DeviceMobileIcon,
} from '@heroicons/react/solid';
import Link from 'next/link';
import defaultNextImageLoader from '../utils/defaultNextImageLoader';

const FallbackAvatar = ({ username }) => {
  return (
    <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-500">
      <span className="text-4xl font-medium leading-none text-white">
        {username?.slice(0, 2)}
      </span>
    </span>
  );
};

const DetailHeader = ({ user, contact, children }) => {
  const { formatMessage } = useIntl();

  return (
    <>
      <div className="my-6 flex items-center">
        <span className="hidden h-16 w-16 rounded-full sm:block">
          {user?.avatar ? (
            <Image
              loader={defaultNextImageLoader}
              src={user.avatar.url}
              alt={user.name || user.username}
              width={64}
              height={64}
            />
          ) : (
            <FallbackAvatar username={user?.username} />
          )}
        </span>
        <div>
          <div className="flex items-center">
            <span className="block h-16 w-16 rounded-full sm:hidden">
              {user?.avatar ? (
                <Image
                  loader={defaultNextImageLoader}
                  src={user.avatar.url}
                  alt={user.name || user.username}
                  width={64}
                  height={64}
                />
              ) : (
                <FallbackAvatar username={user?.username} />
              )}
            </span>
            <span className="flex items-center">
              <h3 className="ml-3 text-2xl font-bold capitalize leading-7 text-gray-900 sm:truncate sm:leading-9">
                <Link href={`/users/${user._id}`}>
                  <a className="hover:text-blue-500">
                    {user?.name ? user.name : user?.username}
                  </a>
                </Link>
              </h3>
              {user?.primaryEmail?.verified && (
                <dl className="self-end">
                  <dt className="sr-only">
                    {formatMessage({
                      id: 'account_status',
                      defaultMessage: 'Account status',
                    })}
                  </dt>
                  <dd className="mt-3 flex items-center self-end text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0">
                    {user?.primaryEmail?.verified ? (
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
              )}
            </span>
          </div>
          <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
            {contact?.emailAddress && (
              <>
                <dt className="sr-only">
                  {formatMessage({ id: 'email', defaultMessage: 'Email' })}
                </dt>
                <dd className="flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6">
                  <AtSymbolIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  {contact.emailAddress}
                </dd>
              </>
            )}

            {contact?.telNumber && (
              <>
                <dt className="sr-only">
                  {formatMessage({ id: 'phone', defaultMessage: 'Phone' })}
                </dt>
                <dd className="flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6">
                  <DeviceMobileIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  {contact.telNumber}
                </dd>
              </>
            )}
          </dl>
        </div>
      </div>

      <div className="mt-2 flex border-b border-gray-200 pb-2 text-sm">
        {children}
      </div>
    </>
  );
};

export default DetailHeader;
