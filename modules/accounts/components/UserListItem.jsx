import Link from 'next/link';
import { useIntl } from 'react-intl';
import ActiveInActive from '../../common/components/ActiveInActive';
import Badge from '../../common/components/Badge';
import MiniUserAvatar from '../../common/components/MiniUserAvatar';

const UserListItem = ({ user }) => {
  const { formatMessage } = useIntl();
  const isVerified = !!user?.primaryEmail?.verified;
  const UserTypes = {
    true: 'Verified',
    false: 'Unverified',
  };
  return (
    <li>
      <Link href={`/users/${user._id}`}>
        <a className="block border-b border-b-slate-200 dark:border-b-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 dark:bg-slate-800">
          <div className="flex items-center px-4 py-4 sm:px-6">
            <div className="flex min-w-0 flex-1 items-center">
              <div className="flex-shrink-0">
                <MiniUserAvatar
                  url={user?.avatar?.url}
                  showName={false}
                  name={user.username}
                />
              </div>
              <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                <div>
                  <div className="truncate text-sm font-medium text-indigo-600 dark:text-indigo-400">
                    {user.name}
                  </div>
                  <div className="flex items-center text-sm text-slate-500 dark:text-slate-200">
                    <svg
                      className="mr-1.5 h-5 w-5 flex-shrink-0 text-slate-400 dark:text-slate-200"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span className="truncate">
                      {user?.primaryEmail?.address}
                    </span>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div>
                    <div className="text-sm text-slate-900">
                      {user.isGuest && (
                        <Badge
                          text={formatMessage({
                            id: 'guest',
                            defaultMessage: 'Guest',
                          })}
                        />
                      )}
                      {user.isTwoFactorEnabled && (
                        <Badge
                          text={formatMessage({
                            id: 'two_factor_auth_enabled',
                            defaultMessage: '2FA Enabled',
                          })}
                        />
                      )}
                    </div>
                    <div className="mt-2 flex items-center text-sm text-slate-500 dark:text-slate-200">
                      <ActiveInActive isActive={isVerified} />
                      {UserTypes[isVerified]}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <svg
                className="h-5 w-5 text-slate-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default UserListItem;
