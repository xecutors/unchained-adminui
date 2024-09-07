import { useRouter } from 'next/router';

import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { IWarehousingProviderType } from '../../gql/types';
import useAuth from '../../modules/Auth/useAuth';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import ListHeader from '../../modules/common/components/ListHeader';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import ProvidersFilter from '../../modules/common/components/ProvidersFilter';

import ProvidersList from '../../modules/common/components/ProvidersList';
import DangerMessage from '../../modules/modal/components/DangerMessage';
import useModal from '../../modules/modal/hooks/useModal';
import useRemoveWarehousingProvider from '../../modules/warehousing-providers/hooks/useRemoveWarehousingProvider';
import useWarehousingProviders from '../../modules/warehousing-providers/hooks/useWarehousingProviders';
import useWarehousingProviderTypes from '../../modules/warehousing-providers/hooks/useWarehousingProviderTypes';

const WarehousingProviders = () => {
  const { formatMessage } = useIntl();
  const router = useRouter();
  const { warehousingProviders, warehousingProvidersCount, loading } =
    useWarehousingProviders({
      type: router.query?.type as IWarehousingProviderType,
    });
  const { removeWarehousingProvider } = useRemoveWarehousingProvider();
  const { warehousingProviderType } = useWarehousingProviderTypes();
  const { setModal } = useModal();
  const { hasRole } = useAuth();

  const onRemoveWarehousingProvider = async (warehousingProviderId) => {
    await setModal(
      <DangerMessage
        onCancelClick={() => setModal('')}
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
        }}
        okText={formatMessage({
          id: 'delete_warehousing_provider',
          defaultMessage: 'Delete warehousing Provider',
        })}
      />,
    );

    return true;
  };

  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'warehousing_providers_header',
          defaultMessage: 'Warehousing providers',
        })}
      />
      <ListHeader
        addPath={
          hasRole('addWarehousingProvider') && '/warehousing-provider/new'
        }
        totalRecords={warehousingProvidersCount}
      >
        <ProvidersFilter
          providerType={warehousingProviderType?.map(({ value }) => value)}
        />
      </ListHeader>
      {loading ? (
        <Loading />
      ) : (
        <ProvidersList
          providerPath="/warehousing-provider"
          providers={warehousingProviders}
          onRemove={onRemoveWarehousingProvider}
          canDelete={hasRole('removeWarehousingProvider')}
          canEdit={hasRole('editWarehousingProvider')}
        />
      )}
    </>
  );
};

export default WarehousingProviders;
