import Link from 'next/link';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import UserList from '../../modules/accounts/components/UserList';
import useUsers from '../../modules/accounts/hooks/useUsers';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import Pagination from '../../modules/common/components/Pagination';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import SearchField from '../../modules/common/components/SearchField';
import Toggle from '../../modules/common/components/Toggle';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';

const Users = () => {
  const { formatMessage } = useIntl();
  const { query } = useRouter();
  const [queryString, setQueryString] = useState('');

  const limit = parseInt(query?.limit, 10) || DefaultLimit;
  const offset = parseInt(query?.skip, 10) || 0;
  const includeGuests = query?.includeGuests === 'true';

  const { users, usersCount, loading } = useUsers({
    limit,
    includeGuests,
    queryString,
    offset,
  });

  return (
    <div className="mb-10">
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'users_list_header',
          defaultMessage: 'Users',
        })}
      />
      <SearchField onInputChange={setQueryString} />
      <div className="mt-5 overflow-hidden px-4 py-2 sm:px-6">
        <div className=" flex items-center justify-between flex-wrap sm:flex-nowrap">
          <div>
            <Toggle
              toggleKey="includeGuests"
              toggleText={formatMessage({
                id: 'show_guests',
                defaultMessage: 'Show Guests',
              })}
            />
          </div>

          <div className="flex-shrink-0">
            <Link href="/users/new">
              <a
                type="button"
                className="rounded relative inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium  text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg
                  className="h-5 w-5"
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
                <span className="ml-2">
                  {formatMessage({
                    id: 'add',
                    defaultMessage: 'Add',
                  })}
                </span>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="shadow my-3">
        {loading ? <Loading /> : <UserList users={users} />}
      </div>
      <Pagination data={users} total={usersCount} />
    </div>
  );
};

export default Users;
