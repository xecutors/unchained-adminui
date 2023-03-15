import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import useAuth from '../../Auth/useAuth';
import ACTION_ROLES from '../../common/data/roles';
import DangerMessage from '../../modal/components/DangerMessage';
import useModal from '../../modal/hooks/useModal';
import useCurrentUser from '../hooks/useCurrentUser';
import useUnLinkOauthProvider from '../hooks/useUnLinkOauthProvider';
import useUserOauthProviders from '../hooks/useUserOauthProviders';
import GoogleOauth from './GoogleOauth';
import LinkedOauthProviderItem from './LinkedOauthProviderItem';

const UserOauthProviders = ({ userId }) => {
  const { formatMessage } = useIntl();
  const { currentUser } = useCurrentUser();

  const { linkedOauthProviders } = useUserOauthProviders({
    userId,
  });
  const { setModal } = useModal();
  const { hasRole } = useAuth();

  const { unlinkOauthProvider } = useUnLinkOauthProvider();

  const handleRemoveProvider = async (provider, authorizationCode) => {
    await setModal(
      <DangerMessage
        message={formatMessage({
          id: 'unlink_oauth_provider',
          defaultMessage: 'Are you sure you want to unlink this  account?',
        })}
        onOkClick={async () => {
          setModal('');
          await unlinkOauthProvider({ provider, authorizationCode });
          toast.success(
            formatMessage({
              id: 'oauth_link_removed',
              defaultMessage: 'Oauth link removed successfully',
            }),
          );
        }}
      />,
    );
  };

  return (
    <div>
      <ul className="border-slate-200 divide-slate-200">
        <GoogleOauth
          redirectTo="http://localhost:3000/account/oauth"
          label={formatMessage({
            id: 'link-with-google-account',
            defaultMessage: 'Link with Google',
          })}
        />
        {linkedOauthProviders?.map((provider) => (
          <LinkedOauthProviderItem
            {...provider}
            key={provider.provider}
            onRemoveProvider={handleRemoveProvider}
            removeDisabled={
              userId !== currentUser?._id &&
              !hasRole(ACTION_ROLES.users.updateUser)
            }
          />
        ))}
      </ul>
    </div>
  );
};

export default UserOauthProviders;
