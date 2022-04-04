import { useState } from 'react';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import useCurrentRoles from '../../modules/accounts/hooks/useCurrentRoles';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import ListHeader from '../../modules/common/components/ListHeader';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import ProvidersFilter from '../../modules/common/components/ProvidersFilter';

import ProvidersList from '../../modules/common/components/ProvidersList';
import ACTION_ROLES from '../../modules/common/data/roles';
import DangerMessage from '../../modules/modal/components/DangerMessage';
import useModal from '../../modules/modal/hooks/useModal';
import useRemoveWarehousingProvider from '../../modules/warehousing-providers/hooks/useRemoveWarehousingProvider';
import useWarehousingProviders from '../../modules/warehousing-providers/hooks/useWarehousingProviders';
import useWarehousingProviderTypes from '../../modules/warehousing-providers/hooks/useWarehousingProviderTypes';

const WarehousingProviders = () => {
  const [type, setType] = useState(null);
  const { formatMessage } = useIntl();

  const { warehousingProviders, loading } = useWarehousingProviders({ type });
  const { removeWarehousingProvider } = useRemoveWarehousingProvider();
  const { warehousingProviderType } = useWarehousingProviderTypes();
  const { setModal } = useModal();
  const { hasRole } = useCurrentRoles();
  const onRemoveWarehousingProvider = async (warehousingProviderId) => {
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
          hasRole(ACTION_ROLES.warehousingProviders.create) &&
          '/warehousing-provider/new'
        }
      >
        <ProvidersFilter
          providerType={warehousingProviderType?.map(({ value }) => value)}
          onProviderFilterChange={setType}
        />
      </ListHeader>
      {loading ? (
        <Loading />
      ) : (
        <ProvidersList
          providerPath="/warehousing-provider"
          providers={warehousingProviders}
          onRemove={onRemoveWarehousingProvider}
          canDelete={hasRole(ACTION_ROLES.warehousingProviders.delete)}
          canUpdate={hasRole(ACTION_ROLES.warehousingProviders.update)}
        />
      )}
    </>
  );
};

export default WarehousingProviders;
