import Image from 'next/image';
import { useIntl } from 'react-intl';
import defaultNextImageLoader from '../utils/defaultNextImageLoader';

const UserAvatar = ({ avatar, username, onLogout }) => {
  const { formatMessage } = useIntl();
  return (
    <a href="#" onClick={onLogout} className="group block flex-shrink-0">
      <div className="flex items-center">
        <>
          {avatar ? (
            <Image
              className="mx-auto h-12 w-auto"
              src={avatar?.url}
              loader={defaultNextImageLoader}
              width={100}
              height={100}
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
        </>
        <div className="ml-3">
          <p className="text-base font-medium text-slate-700 dark:text-white group-hover:text-slate-900 dark:group-hover:text-indigo-500">
            {username}
          </p>
          <p className="text-sm font-medium text-slate-500 dark:text-white group-hover:text-slate-700 dark:group-hover:text-indigo-400">
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
