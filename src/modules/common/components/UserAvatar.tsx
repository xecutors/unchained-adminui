import { useIntl } from 'react-intl';
import defaultNextImageLoader from '../utils/defaultNextImageLoader';
import formatUsername from '../utils/formatUsername';
import ImageWithFallback from './ImageWithFallback';
import { useApolloClient } from '@apollo/client';
import { toast } from 'react-toastify';
import logOut from '../../accounts/hooks/logOut';
import { UserCircleIcon } from '@heroicons/react/24/outline';

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
          <span className="inline-block h-8 w-8 overflow-hidden rounded-full">
            <UserCircleIcon className="h-full w-full text-slate-700" />
          </span>
        )}
        <div className="ml-3">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-800">
            {formatUsername(user)}
          </p>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-800">
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
