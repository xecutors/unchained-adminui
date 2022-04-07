import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';
import useRemoveWarehousingProvider from '../../modules/warehousing-providers/hooks/useRemoveWarehousingProvider';
import useUpdateWarehousingProvider from '../../modules/warehousing-providers/hooks/useUpdateWarehousingProvider';
import useWarehousingProvider from '../../modules/warehousing-providers/hooks/useWarehousingProvider';
import useModal from '../../modules/modal/hooks/useModal';
import ProviderDetail from '../../modules/common/components/ProviderDetail';
import Loading from '../../modules/common/components/Loading';
import DangerMessage from '../../modules/modal/components/DangerMessage';
import HeaderDeleteButton from '../../modules/common/components/HeaderDeleteButton';
import { getInterfaceLabel } from '../../modules/common/utils/utils';

import ACTION_ROLES from '../../modules/common/data/roles';
import useAuth from '../../modules/Auth/useAuth';

const WarehousingProviderUpdate = () => {
  const { formatMessage } = useIntl();
  const { setModal } = useModal();
  const { push: routerPush, query } = useRouter();
  const { hasRole } = useAuth();

  const { warehousingProviderId } = query;

  const { updateWarehousingProvider } = useUpdateWarehousingProvider();
  const { removeWarehousingProvider } = useRemoveWarehousingProvider();

  const { warehousingProvider, loading } = useWarehousingProvider({
    warehousingProviderId,
  });

  const onSubmit = async ({ configuration: config }) => {
    await updateWarehousingProvider({
      configuration: JSON.parse(config || '[]'),
      warehousingProviderId,
    });
    return true;
  };

  const onSubmitSuccess = () => {
    routerPush('/warehousing-provider');
  };

  const handleOnClick = async () => {
    await setModal(
      <DangerMessage
        message={formatMessage({
          id: 'delete_warehousing_provider_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this warehousing provider? ',
        })}
        onOkClick={async () => {
          setModal('');
          await removeWarehousingProvider({ warehousingProviderId });
          toast.success(
            formatMessage({
              id: 'warehousing_provider_deleted',
              defaultMessage: 'Warehousing provider deleted successfully',
            }),
          );
          routerPush('/warehousing-provider');
        }}
        okText={formatMessage({
          id: 'delete_warehousing_provider',
          defaultMessage: 'Delete warehousing Provider',
        })}
      />,
    );
  };

  return (
    <>
      <BreadCrumbs
        currentPageTitle={getInterfaceLabel(warehousingProvider?.interface)}
      />
      <div className="align-center flex min-w-full justify-between">
        <PageHeader
          headerText={formatMessage({
            id: 'update_warehousing_provider_header',
            defaultMessage: 'Update warehousing provider',
          })}
        />
        {hasRole(ACTION_ROLES.warehousingProviders.delete) && (
          <HeaderDeleteButton onClick={handleOnClick} />
        )}
      </div>

      {loading ? (
        <Loading />
      ) : (
        <ProviderDetail
          readOnly={!hasRole(ACTION_ROLES.warehousingProviders.update)}
          provider={warehousingProvider}
          onSubmit={onSubmit}
          onSubmitSuccess={onSubmitSuccess}
        />
      )}
    </>
  );
};

export default WarehousingProviderUpdate;
