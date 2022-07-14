import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import DangerMessage from '../../modal/components/DangerMessage';
import useModal from '../../modal/hooks/useModal';
import useAddWebAuthnCredentials from '../hooks/useAddWebAuthnCredentials';
import useGenerateWebAuthCredentials from '../hooks/useGenerateWebAuthCredentials';
import useRemoveWebAuthnCredentials from '../hooks/useRemoveWebAuthCredentials';
import useUserWebAuthnCredentials from '../hooks/useUserWebAuthnCredentials';
import RegisteredWebAuthItem from './RegisteredWebAuthItem';

const UserWebAuthCredentials = ({ currentUser }) => {
  const { formatMessage } = useIntl();
  const { addWebAuthnCredentials } = useAddWebAuthnCredentials();
  const { webAuthnCredentials } = useUserWebAuthnCredentials({
    userId: currentUser?._id,
  });
  const { setModal } = useModal();

  const { generateWebAuthCredentials } = useGenerateWebAuthCredentials();
  const { removeWebAuthnCredentials } = useRemoveWebAuthnCredentials();

  const handleRemoveWebAuthCredential = async (credentialsId) => {
    await setModal(
      <DangerMessage
        message={formatMessage({
          id: 'delete_web_auth_credential',
          defaultMessage:
            'Are you sure you want to unlink this  device from your account?',
        })}
        onOkClick={async () => {
          setModal('');
          await removeWebAuthnCredentials({ credentialsId });
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
          defaultMessage: 'You have to set a username to use WebAuthn',
        }),
      );
      return;
    }
    const credentials = await generateWebAuthCredentials({
      username: currentUser.username,
    });

    console.log('credentials: ', credentials);

    await addWebAuthnCredentials({
      credentials,
    });
  };

  return (
    <div className="overflow-hidden lg:flex">
      <div className="mb-7 border-slate-200 pb-2 sm:flex sm:justify-between">
        <h3 className="text-lg font-medium leading-6 text-slate-900 dark:text-white">
          {formatMessage({
            id: 'web_authentication',
            defaultMessage: 'Web Authentication',
          })}
        </h3>
      </div>

      <div className="w-full border-b border-slate-200 bg-white dark:border-2 dark:bg-slate-600 rounded-md lg:ml-auto lg:w-4/6">
        <div>
          <ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
            {webAuthnCredentials?.map((credential) => (
              <RegisteredWebAuthItem
                {...credential}
                onRemoveCredential={handleRemoveWebAuthCredential}
              />
            ))}
          </ul>
        </div>
        <button
          type="button"
          className="inline-flex cursor-pointer my-4 ml-4 justify-center rounded-md border border-transparent px-4 py-2 text-center text-sm font-medium leading-5 text-white shadow-sm focus:ring-indigo-400 bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2"
          onClick={handleAddWebAuthCredential}
        >
          {formatMessage({
            id: 'add_web_auth',
            defaultMessage: 'Add WebAuth',
          })}
        </button>
      </div>
    </div>
  );
};

export default UserWebAuthCredentials;
