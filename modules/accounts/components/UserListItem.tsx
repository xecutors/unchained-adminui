import Link from 'next/link';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { IUser } from '../../../gql/types';
import useAuth from '../../Auth/useAuth';
import ActiveInActive from '../../common/components/ActiveInActive';
import Badge from '../../common/components/Badge';
import Button from '../../common/components/Button';
import MiniUserAvatar from '../../common/components/MiniUserAvatar';
import formatUsername from '../../common/utils/formatUsername';
import useCurrentUser from '../hooks/useCurrentUser';
import useImpersonate from '../hooks/useImpersonate';

const UserListItem = ({ user }) => {
  const { formatMessage } = useIntl();
  const { currentUser } = useCurrentUser();
  const { impersonateAs } = useImpersonate();
  const { hasRole, isAdmin } = useAuth();
  const router = useRouter();
  const isVerified = !!user?.primaryEmail?.verified;
  const UserTypes = {
    true: 'Verified',
    false: 'Unverified',
  };
  return (
    <li>
      <Link
        href={`/users/${user._id}`}
        className="block border-b border-b-slate-200 dark:border-b-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 dark:bg-slate-800"
      >
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
                  {formatUsername(user)}
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
                  </div>
                  <div className="mt-2 flex items-center text-sm text-slate-500 dark:text-slate-200">
                    <ActiveInActive isActive={isVerified} />
                    {UserTypes[isVerified?.toString()]}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            {(hasRole('impersonate') || isAdmin(currentUser as IUser)) &&
              user._id !== currentUser._id && (
                <Button
                  onClick={async (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    await impersonateAs({ userId: user._id });
                    router.push('/');
                  }}
                  text={formatMessage({
                    id: 'impersonate-user-account',
                    defaultMessage: 'Impersonate Account',
                  })}
                />
              )}
          </div>
        </div>
      </Link>
    </li>
  );
};

export default UserListItem;
