import Image from 'next/image';
import { useIntl } from 'react-intl';
import defaultNextImageLoader from '../utils/defaultNextImageLoader';

const UserAvatar = ({ avatar, username, onLogout }) => {
  const { formatMessage } = useIntl();
  return (
    <a href="#" onClick={onLogout} className="flex-shrink-0 group block">
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
                id: 'unchained_logo',
                defaultMessage: 'Unchained Logo',
              })}
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
        </>
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
