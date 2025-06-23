import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import UserList from '../../modules/accounts/components/UserList';
import useUsers from '../../modules/accounts/hooks/useUsers';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import InfiniteScroll from '../../modules/common/components/InfiniteScroll';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import SearchField from '../../modules/common/components/SearchField';
import Toggle from '../../modules/common/components/Toggle';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import ListHeader from '../../modules/common/components/ListHeader';
import UserFilter from '../../modules/accounts/components/UserFilter';
import NoData from '../../modules/common/components/NoData';
import LocaleWrapper from '../../modules/common/components/LocaleWrapper';
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

  const { users, usersCount, loading, loadMore, hasMore } = useUsers({
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
      <PageHeader
        headerText={formatMessage(
          (usersCount ?? 0) === 1
            ? { id: 'user_count_header_singular', defaultMessage: '1 User' }
            : { id: 'users_count_header', defaultMessage: '{count} Users' },
          { count: usersCount ?? 0 },
        )}
        addPath="/users/new"
        addButtonText={formatMessage({
          id: 'add_user',
          defaultMessage: 'Add User',
        })}
      />
      <UserFilter />
      <ListHeader>
        <Toggle
          toggleKey="includeGuests"
          toggleText={formatMessage({
            id: 'show_guests',
            defaultMessage: 'Show Guests',
          })}
        />
      </ListHeader>

      <LocaleWrapper
        searchComponent={
          <SearchField
            defaultValue={queryString}
            onInputChange={setQueryString}
          />
        }
      >
        <InfiniteScroll
          loading={loading}
          hasMore={hasMore}
          onLoadMore={loadMore}
        >
          {loading && users?.length === 0 ? (
            <Loading />
          ) : (
            <UserList users={users} />
          )}
          {!loading && !users?.length && (
            <NoData
              message={formatMessage({
                id: 'user',
                defaultMessage: 'User',
              })}
            />
          )}
        </InfiniteScroll>
      </LocaleWrapper>
    </div>
  );
};

export default Users;
