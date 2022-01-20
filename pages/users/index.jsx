import { useState } from 'react';
import { useIntl } from 'react-intl';
import UserList from '../../modules/accounts/components/UserList';
import useUsers from '../../modules/accounts/hooks/useUsers';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';

const User = () => {
  const { formatMessage } = useIntl();
  const [limit, setLimit] = useState(DefaultLimit);
  const [queryString, setQueryString] = useState('');
  const [includeGuests, setShowGuests] = useState(false);

  const { users, usersCount, loadMore } = useUsers({
    limit,
    includeGuests,
    queryString,
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
    </>
  );
};

export default User;
