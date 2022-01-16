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
}) => {
  const { formatMessage } = useIntl();
  return (
    <div className="m-5 flex flex-col">
      <label className="m-3 font-large text-black-700">
        {formatMessage({ id: 'all_users', defaultMessage: 'All Users' })}
      </label>

      <div className="mt-1">
        <select
          defaultValue="-"
          id="SelectUser"
          name="SelectUser"
          placeholder="Select User"
          input-hint="Select User"
          autoComplete="user-name"
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        >
          <option className="text-gray-700" value="-" disabled>
            {formatMessage({
              id: 'select_user',
              defaultMessage: 'Select User',
            })}
          </option>
        </select>
      </div>

      <div className="shadow overflow-hidden border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
        <div className=" -ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
          <div className=" ml-2 mt-2">
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
                  className="ml-3 font-medium text-gray-700"
                >
                  {formatMessage({
                    id: 'show_guests',
                    defaultMessage: 'Show Guests',
                  })}
                </label>
              </div>
            </div>
          </div>

          <div className="ml-4 mt-2 flex-shrink-0">
            <button
              type="button"
              className="relative inline-flex items-center px-3.5 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {formatMessage({
                id: 'add_new_user',
                defaultMessage: 'Add New User',
              })}
            </button>
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
