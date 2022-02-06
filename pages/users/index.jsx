import Link from 'next/link';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import UserList from '../../modules/accounts/components/UserList';
import useUsers from '../../modules/accounts/hooks/useUsers';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import Pagination from '../../modules/common/components/Pagination';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import SearchField from '../../modules/common/components/SearchField';
import Toggle from '../../modules/common/components/Toggle';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';

const Users = ({ showGuests, onShowGuestChange, onSearch }) => {
  const { formatMessage } = useIntl();
  const [limit, setLimit] = useState(DefaultLimit);
  const [queryString, setQueryString] = useState('');
  const [includeGuests, setShowGuests] = useState(false);
  const [offset, setOffset] = useState(0);

  const { users, usersCount, loadMore, loading } = useUsers({
    limit,
    includeGuests,
    queryString,
    offset,
  });

  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'users_list_header',
          defaultMessage: 'Users',
        })}
      />
      <SearchField onInputChange={onSearch} />
      <div className="shadow overflow-hidden border-b border-gray-200 bg-white px-4 py-2 sm:px-6">
        <div className=" flex items-center justify-between flex-wrap sm:flex-nowrap">
          <div>
            <Toggle
              onToggle={onShowGuestChange}
              toggleState={showGuests}
              toggleText={formatMessage({
                id: 'show_guests',
                defaultMessage: 'Show Guests',
              })}
            />
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

      {loading ? (
        <Loading />
      ) : (
        <UserList
          users={users}
          showGuests={includeGuests}
          onShowGuestChange={setShowGuests}
          onSearch={setQueryString}
        />
      )}
      <Pagination
        onLoadMore={loadMore}
        data={users}
        total={usersCount}
        limit={limit}
        onLimitChange={setLimit}
        offset={offset}
        onOffsetChange={setOffset}
      />
    </>
  );
};

export default Users;
