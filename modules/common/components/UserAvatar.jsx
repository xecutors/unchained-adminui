import { useIntl } from 'react-intl';

const UserAvatar = ({ avatar, username, onLogout }) => {
  const { formatMessage } = useIntl();
  return (
    <a onClick={onLogout} className="flex-shrink-0 group block">
      <div className="flex items-center">
        <div>
          {avatar ? (
            <img
              className="inline-block h-9 w-9 rounded-full"
              src={avatar?.url}
              alt=""
            />
          ) : (
            <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
              <svg
                className="h-full w-full text-gray-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
          )}
        </div>
        <div className="ml-3">
          <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
            {username}
          </p>
          <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
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
