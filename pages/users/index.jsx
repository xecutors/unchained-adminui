import { useState } from 'react';
import UserList from '../../modules/accounts/components/UserList';
import useUsers from '../../modules/accounts/hooks/useUsers';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';

const User = () => {
  const [limit, setLimit] = useState(DefaultLimit);
  const [queryString, setQueryString] = useState('');
  const [includeGuests, setShowGuests] = useState(false);

  const { users, usersCount, loadMore } = useUsers({
    limit,
    includeGuests,
    queryString,
  });

  return (
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
  );
};

export default User;
