import { useIntl } from 'react-intl';

const UserListItem = ({ user }) => {
  const { formatMessage } = useIntl();
  const isVerified = !!user?.primaryEmail?.verified;
  const UserTypes = {
    true: 'Verified',
    false: 'Unverified',
  };
  return (
    <tr key={user.email}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img className="h-10 w-10 rounded-full" src={user.image} alt="" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {user.name}{' '}
              {user.isGuest && (
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-600 `}
                >
                  {formatMessage({ id: 'guest', defaultMessage: 'Guest' })}
                </span>
              )}{' '}
            </div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 ${
            isVerified ? ' text-green-600' : ' text-red-600'
          }`}
        >
          {UserTypes[isVerified]}
        </span>
      </td>

      <td className="flex px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          type="button"
          href="#"
          className="flex text-indigo-600 hover:text-indigo-900"
        >
          <svg
            className=" mt-2 mr-2 h-5 w-5 text-indigo-500"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {' '}
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />{' '}
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default UserListItem;
