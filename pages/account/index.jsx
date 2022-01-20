import ChangePassword from '../../modules/accounts/components/ChangePassword';
import EmailAddresses from '../../modules/accounts/components/EmailAddresses';
import ProfileView from '../../modules/accounts/components/ProfileView';
import useCurrentUser from '../../modules/accounts/hooks/useCurrentUser';

const Profile = () => {
  const { currentUser } = useCurrentUser();
  return (
    <div className="px-4 py-5 space-y-6 sm:p-6 rounded-md relative max-w-4xl ">
      <ProfileView {...currentUser} />
      <div className="px-4 py-5 bg-white shadow overflow-hidden border-b border-gray-200">
      <ChangePassword />
      <EmailAddresses emails={currentUser?.emails} enableVerification />
      </div>
    </div>
  );
};

export default Profile;
