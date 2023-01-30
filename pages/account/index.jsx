import { useIntl } from 'react-intl';

import useCurrentUser from '../../modules/accounts/hooks/useCurrentUser';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';

import UserSettings from '../../modules/accounts/components/UserSettings';

const Profile = () => {
  const { formatMessage } = useIntl();
  const { currentUser, extendedData } = useCurrentUser();

  return (
    <div className=" max-w-6xl">
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'account',
          defaultMessage: 'Account',
        })}
      />
      <UserSettings user={currentUser} extendedData={extendedData} />
    </div>
  );
};

export default Profile;
