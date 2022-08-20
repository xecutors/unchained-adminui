import React from 'react';
import { useIntl } from 'react-intl';
import ChangePassword from '../../modules/accounts/components/ChangePassword';
import DisableTwoFactorAuthForm from '../../modules/accounts/components/DisableTwoFactorAuthForm';
import EmailAddresses from '../../modules/accounts/components/EmailAddresses';
import EnableTwoFactorAuthForm from '../../modules/accounts/components/EnableTwoFactorAuthForm';
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
      <div className="max-w-7xl">
        <ProfileView {...currentUser} />
        <div className="space-y-6 overflow-hidden rounded-md border-b dark:border-none sm:p-6">
          <ChangePassword />
          <EmailAddresses emails={currentUser?.emails} enableVerification />
          {!currentUser?.isTwoFactorEnabled && <EnableTwoFactorAuthForm />}
          {currentUser?.isTwoFactorEnabled && (
            <DisableTwoFactorAuthForm userId={currentUser?._id} />
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
