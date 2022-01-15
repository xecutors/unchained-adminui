import { useState } from 'react';
import UserList from '../../modules/accounts/components/UserList';
import useUsers from '../../modules/accounts/hooks/useUsers';
import useUsersCount from '../../modules/accounts/hooks/useUsersCount';
import Layout from '../../modules/common/components/Layout';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';

const user = ({ ...pageProps }) => {
  const [limit, setLimit] = useState(DefaultLimit);
  const [includeGuests, setShowGuests] = useState(false);

  const { users, loadMore } = useUsers({ limit, includeGuests });
  const { usersCount } = useUsersCount({ includeGuests });

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
      />
    </Layout>
  );
};

export default user;
