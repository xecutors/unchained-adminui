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
  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'account',
          defaultMessage: 'Account',
        })}
      />
      <div className="py-4 space-y-6 sm:p-6 rounded-md relative max-w-7xl">
        <ProfileView {...currentUser} />
        <div className="py-5 shadow overflow-hidden border-b space-y-6 sm:p-6 rounded-md">
          <ChangePassword />
          <div className="rounded-md px-4 py-5 w-full lg:w-3/5 lg:ml-auto overflow-hidden bg-white shadow-md border-b border-gray-200">
            <EmailAddresses emails={currentUser?.emails} enableVerification />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
