import { useIntl } from 'react-intl';
import {
  CheckCircleIcon,
  XCircleIcon,
  DevicePhoneMobileIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import formatUsername from '../utils/formatUsername';
import ImageWithFallback from './ImageWithFallback';

const FallbackAvatar = ({ username }) => {
  return (
    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-900">
      <span>{username?.slice(0, 2)}</span>
    </span>
  );
};

const DetailHeader = ({ user, contact }) => {
  const { formatMessage } = useIntl();
  return (
    <div className="flex items-center gap-3">
      <div className="h-12 w-12 rounded-full">
        {user?.avatar ? (
          <ImageWithFallback
            src={user.avatar.url}
            alt={user.name || user.username}
            width={100}
            height={100}
          />
        ) : (
          <FallbackAvatar username={user?.username} />
        )}
      </div>
      <div>
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <span className="block h-12 w-12 rounded-full sm:hidden">
            {user?.avatar ? (
              <ImageWithFallback
                src="/no-image.jpg"
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
              <Link
                href={`/users?userId=${user?._id}`}
                className="text-slate-800 dark:text-slate-700 hover:text-slate-900 dark:hover:text-slate-600"
              >
                {formatUsername(user)}
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
                <dd className="mt-3 flex items-center self-end text-sm font-medium capitalize text-slate-900 sm:mr-6 sm:mt-0">
                  {user?.primaryEmail?.verified ? (
                    <CheckCircleIcon
                      className="mb-1.5 h-4 w-4 shrink-0 text-emerald-400"
                      aria-hidden="true"
                    />
                  ) : (
                    <XCircleIcon
                      className="mb-1.5 h-4 w-4 shrink-0 text-rose-400"
                      aria-hidden="true"
                    />
                  )}
                </dd>
              </dl>
            )}
          </span>
        </div>

        <div className="">
          {contact?.emailAddress && <div>{contact.emailAddress}</div>}

          {contact?.telNumber && <div>{contact.telNumber}</div>}
        </div>
      </div>
    </div>
  );
};

export default DetailHeader;
