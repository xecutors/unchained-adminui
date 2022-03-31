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
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-500">
      <span className="text font-medium leading-none text-white">
        {username?.slice(0, 2)}
      </span>
    </span>
  );
};

const DetailHeader = ({ user, contact }) => {
  const { formatMessage } = useIntl();
  return (
    <div className="flex items-center">
      <span className="hidden h-8 w-8 rounded-full sm:block">
        {user?.avatar ? (
          <Image
            loader={defaultNextImageLoader}
            src={user.avatar.url}
            alt={user.name || user.username}
            width={8}
            height={8}
          />
        ) : (
          <FallbackAvatar username={user?.username} />
        )}
      </span>
      <div>
        <div className="flex items-center">
          <span className="block h-8 w-8 rounded-full sm:hidden">
            {user?.avatar ? (
              <Image
                loader={defaultNextImageLoader}
                src={user.avatar.url}
                alt={user.name || user.username}
                width={8}
                height={8}
              />
            ) : (
              <FallbackAvatar username={user?.username} />
            )}
          </span>
          <span className="flex items-center">
            <h3 className="ml-3 text-xl font-bold capitalize">
              <Link href={`/users/${user._id}`}>
                <a className="text-blue-500 hover:text-blue-600">
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
                <dd className="mt-3 flex items-center self-end text-sm font-medium capitalize text-slate-500 sm:mr-6 sm:mt-0">
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
              <dd className="flex items-center text-xl font-medium capitalize sm:mr-6">
                {contact.emailAddress}
              </dd>
            </>
          )}

          {contact?.telNumber && (
            <>
              <dt className="sr-only">
                {formatMessage({ id: 'phone', defaultMessage: 'Phone' })}
              </dt>
              <dd className="flex items-center text-sm font-medium capitalize text-slate-500 sm:mr-6">
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
  );
};

export default DetailHeader;
