import ChangePassword from '../../modules/accounts/components/ChangePassword';
import EmailAddresses from '../../modules/accounts/components/EmailAddresses';
import ProfileView from '../../modules/accounts/components/ProfileView';
import useCurrentUser from '../../modules/accounts/hooks/useCurrentUser';

const Profile = () => {
  const { currentUser } = useCurrentUser();
  return (
    <>
      <ProfileView {...currentUser} />
      <ChangePassword />
      <EmailAddresses emails={currentUser?.emails} enableVerification />
    </>
  );
};

export default Profile;
