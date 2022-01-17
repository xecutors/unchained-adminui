import { useState } from 'react';
import UserList from '../../modules/accounts/components/UserList';
import useUsers from '../../modules/accounts/hooks/useUsers';
import Layout from '../../modules/common/components/Layout';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';

const User = ({ ...pageProps }) => {
  const [limit, setLimit] = useState(DefaultLimit);
  const [queryString, setQueryString] = useState('');
  const [includeGuests, setShowGuests] = useState(false);

  const { users, usersCount, loadMore } = useUsers({
    limit,
    includeGuests,
    queryString,
  });

  return (
    <Layout {...pageProps}>
      <UserList
        users={users}
        limit={limit}
        onLimitChange={setLimit}
        total={usersCount}
        onLoadMore={loadMore}
        showGuests={includeGuests}
        onShowGuestChange={setShowGuests}
        onSearch={setQueryString}
      />
    </Layout>
  );
};

export default User;
