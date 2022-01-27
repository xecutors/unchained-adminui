import { useIntl } from 'react-intl';
import EmailAddresses from './EmailAddresses';
import UserNameView from './UserNameView';
import UserRolesView from './UserRolesView';
import UserTagsView from './UserTagsView';

const AccountView = ({ _id, emails, username, roles, tags }) => {
  const { formatMessage } = useIntl();
  return (
    <>
      <div className="shadow overflow-hidden border-b border-gray-200  px-4 py-5 bg-white space-y-6 sm:p-6 rounded-md ">
        <div className=" space-y-1">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {formatMessage({
              id: 'account',
              defaultMessage: 'Account',
            })}
          </h3>
          <p className="max-w-2xl text-sm text-gray-500">
            {formatMessage({
              id: 'account_notice',
              defaultMessage:
                'This information will be displayed publicly so be careful what you share.',
            })}
          </p>
        </div>
        <div className="mt-6 ">
          <UserNameView username={username} _id={_id} />
        </div>
        <div className="mt-6">
          <EmailAddresses emails={emails} userId={_id} />
        </div>
        <div className="mt-6">
          <UserTagsView tags={tags} userId={_id} />
        </div>
        <div className="pt-2">
          <UserRolesView roles={roles} userId={_id} />
        </div>
      </div>
    </>
  );
};

export default AccountView;
