import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import useUser from '../../modules/accounts/hooks/useUser';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';

import PageHeader from '../../modules/common/components/PageHeader';
import UserSettings from '../../modules/accounts/components/UserSettings';

const UserProfile = () => {
  const { formatMessage } = useIntl();
  const { query } = useRouter();
  const { userId } = query;

  const { user, extendedData } = useUser({ userId: userId as string });

  return (
    <div className=" max-w-6xl">
      <BreadCrumbs currentPageTitle={user ? `${user?.name}` : ''} />
      <PageHeader
        headerText={formatMessage({
          id: 'users_setting_list_header',
          defaultMessage: 'User settings',
        })}
      />
      <UserSettings user={user} extendedData={extendedData} />
    </div>
  );
};

export default UserProfile;
