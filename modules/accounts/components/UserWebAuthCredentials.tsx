import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import useAuth from '../../Auth/useAuth';
import DangerMessage from '../../modal/components/DangerMessage';
import useModal from '../../modal/hooks/useModal';
import useAddWebAuthnCredentials from '../hooks/useAddWebAuthnCredentials';
import useCurrentUser from '../hooks/useCurrentUser';
import useGenerateWebAuthCredentials from '../hooks/useGenerateWebAuthCredentials';
import useRemoveWebAuthCredentials from '../hooks/useRemoveWebAuthCredentials';
import useUserWebAuthnCredentials from '../hooks/useUserWebAuthnCredentials';
import RegisteredWebAuthItem from './RegisteredWebAuthItem';

const UserWebAuthCredentials = ({ userId }) => {
  const { formatMessage } = useIntl();
  const { currentUser } = useCurrentUser();
  const { addWebAuthnCredentials } = useAddWebAuthnCredentials();
  const { webAuthnCredentials } = useUserWebAuthnCredentials({
    userId,
  });
  const { setModal } = useModal();
  const { hasRole } = useAuth();

  const { generateWebAuthCredentials } = useGenerateWebAuthCredentials();
  const { removeWebAuthCredentials } = useRemoveWebAuthCredentials();

  const handleRemoveWebAuthCredential = async (credentialsId) => {
    await setModal(
      <DangerMessage
        onCancelClick={async () => setModal('')}
        message={formatMessage({
          id: 'delete_web_auth_credential',
          defaultMessage:
            'Are you sure you want to unlink this  device from your account?',
        })}
        onOkClick={async () => {
          setModal('');
          await removeWebAuthCredentials({ credentialsId });
          toast.success(
            formatMessage({
              id: 'web_auth_credential_removed',
              defaultMessage: 'Credential removed successfully',
            }),
          );
        }}
      />,
    );
  };

  const handleAddWebAuthCredential = async () => {
    if (!currentUser.username) {
      toast.error(
        formatMessage({
          id: 'web_auth_username_required',
          defaultMessage: 'A username is required to use WebAuthn',
        }),
      );
      return;
    }
    const credentials = await generateWebAuthCredentials({
      username: currentUser.username,
    });

    await addWebAuthnCredentials({
      credentials,
    });
  };

  return (
    <>
      <div>
        <ul className="border-slate-200 divide-slate-200">
          {webAuthnCredentials?.map((credential) => (
            <RegisteredWebAuthItem
              md5Metadata={credential?.mdsMetadata}
              {...credential}
              key={credential?._id}
              onRemoveCredential={handleRemoveWebAuthCredential}
              removeDisabled={
                userId !== currentUser?._id && !hasRole('editUserProfile')
              }
            />
          ))}
        </ul>
      </div>
      <button
        type="button"
        disabled={userId !== currentUser?._id}
        className={classNames(
          'inline-flex cursor-pointer ml-4 justify-center rounded-md border border-transparent px-4 py-2 text-center text-sm font-medium leading-5 text-white shadow-sm focus:ring-indigo-400 bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2',
          {
            'focus:ring-indigo-200 bg-indigo-300 hover:bg-indigo-200':
              userId !== currentUser?._id,
          },
        )}
        onClick={handleAddWebAuthCredential}
      >
        {formatMessage({
          id: 'add_web_auth',
          defaultMessage: 'Add WebAuth',
        })}
      </button>
    </>
  );
};

export default UserWebAuthCredentials;
