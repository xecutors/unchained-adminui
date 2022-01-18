import { useIntl } from 'react-intl';
import ListPagination from '../../common/components/ListPagination';
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
    <div className="m-5 flex flex-col">
      <label className="m-3 font-large text-black-700">
        {formatMessage({ id: 'all_users', defaultMessage: 'All Users' })}
      </label>

      <div className="mt-1">
        <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
          <div className="w-full">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                onChange={(e) => onSearch(e.target.value)}
                id="search"
                name="search"
                className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search"
                type="search"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="shadow overflow-hidden border-b border-gray-200 bg-white px-4 py-2 sm:px-6">
        <div className=" flex items-center justify-between flex-wrap sm:flex-nowrap">
          <div className=" ">
            <div className=" relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="shoe-guests"
                  aria-describedby="shoe-guests"
                  name="shoe-guests"
                  type="checkbox"
                  checked={showGuests}
                  onChange={() => onShowGuestChange(!showGuests)}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <label
                  htmlFor="show-guests"
                  className="ml-3 font-sm text-xs text-gray-700"
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
          </div>
        </div>
      </div>

      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 ">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-white">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {formatMessage({ id: 'name', defaultMessage: 'Name' })}
                  </th>

                  {/* <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    &nbsp;
                  </th> */}

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    &nbsp;
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">
                      {formatMessage({ id: 'edit', defaultMessage: 'Edit' })}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users?.map((person) => (
                  <UserListItem key={person?._id} user={person} />
                ))}
              </tbody>
            </table>
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
