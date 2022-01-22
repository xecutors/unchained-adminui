import Link from 'next/link';
import { useIntl } from 'react-intl';
import ListPagination from '../../common/components/ListPagination';
import SearchField from '../../common/components/SearchField';
import UserListItem from './UserListItem';

const UserList = ({
  users,
  total,
  onLimitChange,
  onLoadMore,
  showGuests,
  onShowGuestChange,
  onSearch,
}) => {
  const { formatMessage } = useIntl();
  return (
    <div className="flex flex-col">
      <SearchField onInputChange={onSearch} />
      <div className="shadow overflow-hidden border-b border-gray-200 bg-white px-4 py-2 sm:px-6">
        <div className=" flex items-center justify-between flex-wrap sm:flex-nowrap">
          <div className=" ">
            <div className=" relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="show-guests"
                  aria-describedby="shoe-guests"
                  name="show-guests"
                  type="checkbox"
                  checked={showGuests}
                  onChange={() => onShowGuestChange(!showGuests)}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <label
                  htmlFor="show-guests"
                  className="ml-3  text-xs text-gray-700"
                >
                  {formatMessage({
                    id: 'show_guests',
                    defaultMessage: 'Show Guests',
                  })}
                </label>
              </div>
            </div>
          </div>

          <div className=" flex-shrink-0">
            <Link href="/users/new">
              <a
                type="button"
                className="rounded-full relative inline-flex items-center px-3 py-3 border border-transparent shadow-sm text-sm font-medium  text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </Link>
          </div>
        </div>
      </div>

      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 ">
            <ul>
              {users?.map((person) => (
                <UserListItem key={person?._id} user={person} />
              ))}
            </ul>
          </div>
        </div>
      </div>
      <ListPagination
        onLoadMore={onLoadMore}
        data={users}
        total={total}
        onLimitChange={onLimitChange}
      />
    </div>
  );
};

export default UserList;
