import { useIntl } from 'react-intl';
import ChangePassword from '../../modules/accounts/components/ChangePassword';
import EmailAddresses from '../../modules/accounts/components/EmailAddresses';
import ProfileView from '../../modules/accounts/components/ProfileView';
import useCurrentUser from '../../modules/accounts/hooks/useCurrentUser';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';

const Profile = () => {
  const { formatMessage } = useIntl();
  const { currentUser } = useCurrentUser();
  console.log('aaaaa', currentUser);
  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'account',
          defaultMessage: 'Account',
        })}
      />
      <div className="max-w-7xl">
        <ProfileView {...currentUser} />
        <div className="space-y-6 overflow-hidden rounded-md border-b sm:p-6">
          <ChangePassword />
          <EmailAddresses emails={currentUser?.emails} enableVerification />
        </div>
      </div>
    </>
  );
};

export default Profile;
