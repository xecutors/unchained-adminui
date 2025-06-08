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
import ListHeader from '../../modules/common/components/ListHeader';
import UserFilter from '../../modules/accounts/components/UserFilter';
import NoData from '../../modules/common/components/NoData';
import UserDetailPage from './UserDetailPage';

const Users = () => {
  const { formatMessage } = useIntl();
  const { query, push, isReady } = useRouter();
  const { queryString, userId, ...rest } = query;

  const setQueryString = (searchString) => {
    const { skip, ...withoutSkip } = rest || { skip: null };
    if (searchString)
      push({
        query: {
          ...withoutSkip,
          queryString: searchString,
        },
      });
    else
      push({
        query: {
          ...rest,
        },
      });
  };

  const limit = parseInt(query?.limit as string, 10) || DefaultLimit;
  const offset = parseInt(query?.skip as string, 10) || 0;
  const includeGuests = query?.includeGuests === 'true';
  let emailVerified = null;
  if (query?.emailVerified === 'true') {
    emailVerified = true;
  } else if (query?.emailVerified === 'false') {
    emailVerified = false;
  }

  const lastLogin = (query?.start || query?.end) && {
    start: query?.start as string,
    end: query?.end as string,
  };

  const { users, usersCount, loading, loadMore } = useUsers({
    limit,
    includeGuests,
    queryString: queryString as string,
    offset,
    lastLogin,
    emailVerified,
  });
  if (!isReady) {
    return null; // or a loading spinner
  }

  if (userId) return <UserDetailPage userId={userId} />;

  return (
    <div className="mb-10">
      <BreadCrumbs />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <PageHeader
          headerText={formatMessage({
            id: 'users_list_header',
            defaultMessage: 'Users',
          })}
        />
        <SearchField
          defaultValue={queryString}
          onInputChange={setQueryString}
        />
      </div>
      <UserFilter />
      <ListHeader addPath="/users/new" totalRecords={usersCount}>
        <Toggle
          toggleKey="includeGuests"
          toggleText={formatMessage({
            id: 'show_guests',
            defaultMessage: 'Show Guests',
          })}
        />
      </ListHeader>

      <div className="my-3 shadow-sm">
        {loading ? <Loading /> : <UserList users={users} />}
        {!loading && !users?.length && (
          <NoData
            message={formatMessage({
              id: 'user',
              defaultMessage: 'User',
            })}
          />
        )}
      </div>
      <Pagination data={users} total={usersCount} />
    </div>
  );
};

export default Users;
