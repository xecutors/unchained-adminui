import EmailAddresses from './EmailAddresses';
import UserNameView from './UserNameView';

const AccountView = ({ _id, emails, username, roles, tags }) => {
  console.log(username);
  return (
    <>
      <div className="flex justify-between">
        <div className="space-y-1">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Profile
          </h3>
          <p className="max-w-2xl text-sm text-gray-500">
            This information will be displayed publicly so be careful what you
            share.
          </p>
        </div>
      </div>
      <UserNameView username={username} _id={_id} />
      <EmailAddresses emails={emails} />
    </>
  );
};

export default AccountView;
