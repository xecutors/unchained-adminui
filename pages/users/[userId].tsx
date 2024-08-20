import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import useUser from '../../modules/accounts/hooks/useUser';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';

import PageHeader from '../../modules/common/components/PageHeader';
import UserSettings from '../../modules/accounts/components/UserSettings';
import useDeleteAccount from '../../modules/accounts/hooks/useDeleteAccount';
import { useCallback } from 'react';
import useModal from '../../modules/modal/hooks/useModal';
import DangerMessage from '../../modules/modal/components/DangerMessage';
import { toast } from 'react-toastify';

const UserProfile = () => {
  const { formatMessage } = useIntl();
  const { query } = useRouter();
  const { userId } = query;
  const { setModal } = useModal();
  const { deleteAccount } = useDeleteAccount();
  const { user, extendedData } = useUser({ userId: userId as string });

  const onDeleteAccount = useCallback(async () => {
    await setModal(
      <DangerMessage
        onCancelClick={async () => setModal('')}
        message={formatMessage({
          id: 'delete_user_account_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it ',
        })}
        onOkClick={async () => {
          setModal('');
          await deleteAccount(user._id);
          toast.success(
            formatMessage({
              id: 'user_deleted',
              defaultMessage: 'User deleted successfully',
            }),
          );
        }}
        okText={formatMessage({
          id: 'delete_user_account',
          defaultMessage: 'Delete user',
        })}
      />,
    );
  }, [user]);

  return (
    <div className=" max-w-6xl">
      <BreadCrumbs currentPageTitle={user ? `${user?.name}` : ''} />
      <PageHeader
        headerText={formatMessage({
          id: 'users_setting_list_header',
          defaultMessage: 'User settings',
        })}
        onDelete={onDeleteAccount}
      />
      <UserSettings user={user} extendedData={extendedData} />
    </div>
  );
};

export default UserProfile;
