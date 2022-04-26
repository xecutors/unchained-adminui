import { useIntl } from 'react-intl';
import SelfDocumentingView from '../../common/components/SelfDocumentingView';
import EmailAddresses from './EmailAddresses';
import UserNameView from './UserNameView';
import UserRolesView from './UserRolesView';
import UserTagsView from './UserTagsView';

const AccountView = ({ _id, emails, username, roles, tags }) => {
  const { formatMessage } = useIntl();
  return (
    <>
      <SelfDocumentingView
        documentationLabel={formatMessage({
          id: 'account',
          defaultMessage: 'Account',
        })}
        documentation={formatMessage({
          id: 'account_notice',
          defaultMessage:
            'This information will be displayed publicly so be careful what you share.',
        })}
        mainContent={
          <div className="space-y-6 overflow-hidden rounded-md p-3 shadow bg-white dark:border-2 dark:bg-slate-600 sm:p-6">
            <UserNameView username={username} _id={_id} />
          </div>
        }
      />

      <div className="space-y-6 overflow-hidden rounded-md  border-slate-200 py-5">
        <div className="mt-6">
          <EmailAddresses
            emails={emails}
            enableVerification
            userId={_id}
            emailBodyContainer="rounded-md shadow"
          />
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-slate-200" />
        </div>
      </div>
      <SelfDocumentingView
        documentationLabel={formatMessage({
          id: 'tags',
          defaultMessage: 'Tags',
        })}
        mainContent={
          <div className="my-2 rounded-md px-4 py-5 shadow bg-white dark:border-2 dark:bg-slate-600 sm:p-6">
            <UserTagsView
              tags={tags}
              userId={_id}
              tagButtonClasses="rounded-md"
              tagInputClasses="mt-2"
            />
          </div>
        }
      />

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-slate-200" />
        </div>
      </div>

      <SelfDocumentingView
        documentationLabel={formatMessage({
          id: 'roles',
          defaultMessage: 'Roles',
        })}
        mainContent={
          <div className="space-y-6 overflow-hidden rounded-md border-b bg-white dark:border-2 dark:bg-slate-600 text-slate-900 dark:text-white border-slate-200 px-4 py-5 shadow  sm:p-6">
            <UserRolesView roles={roles} userId={_id} />
          </div>
        }
      />

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-slate-200" />
        </div>
      </div>
    </>
  );
};

export default AccountView;
