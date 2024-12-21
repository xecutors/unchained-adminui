import Link from 'next/link';
import { useIntl } from 'react-intl';
import ActiveInActive from '../../common/components/ActiveInActive';
import Badge from '../../common/components/Badge';
import MiniUserAvatar from '../../common/components/MiniUserAvatar';
import formatUsername from '../../common/utils/formatUsername';
import useCurrentUser from '../hooks/useCurrentUser';
import Loading from '../../common/components/Loading';
import { ShoppingBagIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';

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
    <div className="text-xs text-gray-500">
      <span className="font-semibold">
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
    <li className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">
      <Link href={`/users/${user._id}`} className="block p-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <MiniUserAvatar
              url={user?.avatar?.url}
              showName={false}
              name={user.username}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 truncate">
                  {formatUsername(user)}
                </span>
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  {user.isGuest && (
                    <Badge
                      text={formatMessage({
                        id: 'guest',
                        defaultMessage: 'Guest',
                      })}
                      color="blue"
                    />
                  )}
                  <ActiveInActive isActive={isVerified} />
                  <span className="texts-sm font-bold text-slate-500 dark:text-slate-200">
                    {UserTypes[isVerified.toString()]}
                  </span>
                </div>
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-200">
                <div className="truncate">{user?.primaryEmail?.address}</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2 text-gray-600">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <ShoppingCartIcon className="w-4 h-4 text-gray-400" />
                <Badge color="yellow" text={user?.cart?.items?.length || 0} />
              </div>
              <div className="flex items-center space-x-1">
                <ShoppingBagIcon className="w-4 h-4 text-gray-400" />
                <Badge text={user?.orders?.length || 0} />
              </div>
            </div>
            <UserLastLogin lastLogin={user?.lastLogin} />
          </div>
        </div>
      </Link>
    </li>
  );
};

export default UserListItem;
