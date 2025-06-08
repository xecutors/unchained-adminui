import { useIntl } from 'react-intl';
import defaultNextImageLoader from '../utils/defaultNextImageLoader';
import formatUsername from '../utils/formatUsername';
import ImageWithFallback from './ImageWithFallback';
import { useApolloClient } from '@apollo/client';
import { toast } from 'react-toastify';
import logOut from '../../accounts/hooks/logOut';

const UserAvatar = ({ avatar, ...user }) => {
  const { formatMessage } = useIntl();
  const apolloClient = useApolloClient();

  const onLogout = async () => {
    await logOut(apolloClient);
    toast.success(
      formatMessage({
        id: 'logged_out',
        defaultMessage: 'Logged out',
      }),
    );
  };

  return (
    <a href="#" onClick={onLogout} className="group block shrink-0">
      <div className="flex items-center">
        {avatar ? (
          <ImageWithFallback
            src={avatar?.url}
            loader={defaultNextImageLoader}
            width={36}
            height={36}
            className="rounded"
            alt={formatMessage({
              id: 'user_avatar',
              defaultMessage: 'User avatar',
            })}
          />
        ) : (
          <span className="inline-block h-8 w-8 overflow-hidden rounded-full bg-slate-100">
            <svg
              className="h-full w-full text-slate-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>
        )}
        <div className="ml-3">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-indigo-400">
            {formatUsername(user)}
          </p>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-indigo-400">
            {formatMessage({
              id: 'log_out',
              defaultMessage: 'Log out',
            })}
          </p>
        </div>
      </div>
    </a>
  );
};

export default UserAvatar;
