import Link from 'next/link';
import { useIntl } from 'react-intl';
import ActiveInActive from '../../common/components/ActiveInActive';
import Badge from '../../common/components/Badge';
import MiniUserAvatar from '../../common/components/MiniUserAvatar';
import formatUsername from '../../common/utils/formatUsername';
import useCurrentUser from '../hooks/useCurrentUser';
import Loading from '../../common/components/Loading';
import { ShoppingBagIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

const UserLastLogin = ({ lastLogin }) => {
  const { formatMessage, locale } = useIntl();
  const loginDate = new Date(lastLogin?.timestamp);
  if (!loginDate?.getTime()) return null;
  const formattedDate = loginDate.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const formattedTime = loginDate.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
  });
  return (
    <div className="text-sm text-slate-500">
      <span>
        {formatMessage({ id: 'last_login', defaultMessage: 'Last Login: ' })}
      </span>{' '}
      {formattedDate}, {formattedTime}
    </div>
  );
};

const UserListItem = ({ user }) => {
  const { formatMessage, locale } = useIntl();
  const { currentUser, loading } = useCurrentUser();
  const isVerified = !!user?.primaryEmail?.verified;
  const UserTypes = {
    true: 'Verified',
    false: 'Unverified',
  };

  if (loading && !currentUser) return <Loading />;

  return (
    <li className="mb-3 bg-white dark:bg-slate-800 group border-2 border-slate-100 dark:border-slate-800 hover:border-slate-100 dark:hover:border-slate-600 transition-all duration-200 ease-in-out shadow-xs hover:shadow-sm rounded-md">
      <Link
        href={`/users?userId=${user._id}`}
        className="block px-2 py-2 sm:px-3 sm:py-3"
      >
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center">
            <MiniUserAvatar
              url={user?.avatar?.url}
              showName={false}
              name={user.username}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-300 truncate">
                  {formatUsername(user)}
                </span>
                <div className="flex items-center gap-1 justify-between flex-wrap text-xs text-slate-500">
                  {user.isGuest && (
                    <Badge
                      text={formatMessage({
                        id: 'guest',
                        defaultMessage: 'Guest',
                      })}
                      color="blue"
                    />
                  )}
                </div>
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-200">
                <div className="truncate">{user?.primaryEmail?.address}</div>
              </div>
              <UserLastLogin lastLogin={user?.lastLogin} />
            </div>
          </div>
          <div className="flex items-end flex-wrap gap-10 text-slate-600">
            <div className="flex items-center gap-2">
              <ActiveInActive isActive={isVerified} />
              <span className="texts-sm font-bold text-slate-500 dark:text-slate-200">
                {UserTypes[isVerified.toString()]}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 justify-between flex-wrap">
                <ShoppingCartIcon className="w-4 h-4 text-slate-500" />
                <Badge color="yellow" text={user?.cart?.items?.length || 0} />
              </div>
              <div className="flex items-center gap-1 justify-between flex-wrap">
                <ShoppingBagIcon className="w-4 h-4 text-slate-500" />
                <Badge text={user?.orders?.length || 0} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default UserListItem;
