import EmailAddresses from './EmailAddresses';
import UserNameView from './UserNameView';
import UserRolesView from './UserRolesView';
import UserTagsView from './UserTagsView';

const AccountView = ({ _id, emails, username, roles, tags }) => {
  return (
    <>
      <div className="flex justify-between">
        <div className="px-4 py-8 bg-white space-y-6 sm:p-10">
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-1">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Profile
              </h3>
              <p className="max-w-2xl text-sm text-gray-500">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>
          </div>
          <div className="mt-6 h-10">
            <UserNameView username={username} _id={_id} />
          </div>
          <div className="mt-6">
            <EmailAddresses emails={emails} userId={_id} />
          </div>
          <div className="mt-6">
            <UserTagsView tags={tags} userId={_id} />
          </div>
          <div className="mt-6">
            <UserRolesView roles={roles} userId={_id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountView;
