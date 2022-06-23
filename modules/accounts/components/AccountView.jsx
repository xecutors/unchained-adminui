import { useIntl } from 'react-intl';
import useAuth from '../../Auth/useAuth';
import SelfDocumentingView from '../../common/components/SelfDocumentingView';
import useCurrentUser from '../hooks/useCurrentUser';
import DisableTwoFactorAuthForm from './DisableTwoFactorAuthForm';
import EmailAddresses from './EmailAddresses';
import EnableTwoFactorAuthForm from './EnableTwoFactorAuthForm';
import SetPassword from './SetPassword';
import UserNameView from './UserNameView';
import UserRolesView from './UserRolesView';
import UserTagsView from './UserTagsView';

const AccountView = ({
  _id,
  emails,
  username,
  roles,
  tags,
  isTwoFactorEnabled,
}) => {
  const { formatMessage } = useIntl();
  const { currentUser } = useCurrentUser();
  const { isAdmin } = useAuth();
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
      >
        <div className="space-y-6 overflow-hidden rounded-md p-3 shadow bg-white dark:border-2 dark:bg-slate-600 sm:p-6">
          <UserNameView username={username} _id={_id} />
        </div>
      </SelfDocumentingView>

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
      >
        <div className="my-2 rounded-md px-4 py-5 shadow bg-white dark:border-2 dark:bg-slate-600 sm:p-6">
          <UserTagsView
            tags={tags}
            userId={_id}
            tagButtonClasses="rounded-md"
            tagInputClasses="mt-2"
          />
        </div>
      </SelfDocumentingView>
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
      >
        <div className="space-y-6 overflow-hidden rounded-md border-b bg-white dark:border-2 dark:bg-slate-600 text-slate-900 dark:text-white border-slate-200 px-4 py-5 shadow  sm:p-6">
          <UserRolesView roles={roles} userId={_id} />
        </div>
      </SelfDocumentingView>
      {isAdmin() ? (
        <>
          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-slate-200" />
            </div>
          </div>

          <div className="space-y-6 overflow-hidden rounded-md  border-slate-200 py-5">
            <div className="mt-6">
              <SetPassword userId={_id} />
            </div>
          </div>
        </>
      ) : null}
      {currentUser?._id === _id && !isTwoFactorEnabled && (
        <EnableTwoFactorAuthForm />
      )}
      {isTwoFactorEnabled && isAdmin() && (
        <DisableTwoFactorAuthForm userId={_id} />
      )}
    </>
  );
};

export default AccountView;
