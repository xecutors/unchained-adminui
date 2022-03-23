import { useIntl } from 'react-intl';
import EmailAddresses from './EmailAddresses';
import UserNameView from './UserNameView';
import UserRolesView from './UserRolesView';
import UserTagsView from './UserTagsView';

const AccountView = ({ _id, emails, username, roles, tags }) => {
  const { formatMessage } = useIntl();
  return (
    <>
      <div className="mt-3 md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {formatMessage({
                id: 'account',
                defaultMessage: 'Account',
              })}
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              {formatMessage({
                id: 'account_notice',
                defaultMessage:
                  'This information will be displayed publicly so be careful what you share.',
              })}
            </p>
          </div>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <div className="space-y-6 overflow-hidden rounded-md bg-white shadow sm:p-6">
            <UserNameView username={username} _id={_id} />
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {formatMessage({
                id: 'email_addresses',
                defaultMessage: 'Email addresses',
              })}
            </h3>
          </div>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <div className="space-y-6 overflow-hidden rounded-md border-b  border-gray-200 bg-white px-4 py-5 shadow sm:p-6 ">
            <div className="mt-6">
              <EmailAddresses emails={emails} userId={_id} />
            </div>
          </div>
        </div>
      </div>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {formatMessage({
                id: 'tags',
                defaultMessage: 'Tags',
              })}
            </h3>
          </div>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <div className="space-y-6 overflow-hidden rounded-md border-b  border-gray-200 bg-white px-4 py-5 shadow sm:p-6 ">
            <UserTagsView tags={tags} userId={_id} />
          </div>
        </div>
      </div>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {formatMessage({
                id: 'roles',
                defaultMessage: 'Roles',
              })}
            </h3>
          </div>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <div className="space-y-6 overflow-hidden rounded-md border-b  border-gray-200 bg-white px-4 py-5 shadow sm:p-6 ">
            <UserRolesView roles={roles} userId={_id} />
          </div>
        </div>
      </div>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
    </>
  );
};

export default AccountView;
