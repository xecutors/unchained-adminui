import { useRouter } from 'next/router';

import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import useAuth from '../../modules/Auth/useAuth';

import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import ListHeader from '../../modules/common/components/ListHeader';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import ProvidersFilter from '../../modules/common/components/ProvidersFilter';
import ProvidersList from '../../modules/common/components/ProvidersList';
import useDeliveryProviders from '../../modules/delivery-provider/hooks/useDeliveryProviders';
import useDeliveryProviderTypes from '../../modules/delivery-provider/hooks/useDeliveryProviderTypes';
import useRemoveDeliveryProvider from '../../modules/delivery-provider/hooks/useRemoveDeliveryProvider';
import DangerMessage from '../../modules/modal/components/DangerMessage';
import useModal from '../../modules/modal/hooks/useModal';

const DeliveryProviders = () => {
  const router = useRouter();

  const { formatMessage } = useIntl();
  const { hasRole } = useAuth();
  const { deliveryProviders, loading } = useDeliveryProviders({
    type: router.query?.type,
  });
  const { setModal } = useModal();
  const { removeDeliveryProvider } = useRemoveDeliveryProvider();
  const { deliveryProviderType } = useDeliveryProviderTypes();

  const onRemoveDeliveryProvider = async (deliveryProviderId) => {
    await setModal(
      <DangerMessage
        message={formatMessage({
          id: 'delete_delivery_provider_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this delivery provider?',
        })}
        onOkClick={async () => {
          setModal('');
          await removeDeliveryProvider({ deliveryProviderId });
          toast.success(
            formatMessage({
              id: 'deliveryProviders_deleted',
              defaultMessage: 'DeliveryProviders deleted successfully',
            }),
          );
        }}
        okText={formatMessage({
          id: 'delete_delivery_provider',
          defaultMessage: 'Delete delivery provider',
        })}
      />,
    );
  };

  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'delivery_providers_header',
          defaultMessage: 'Delivery providers',
        })}
      />
      <ListHeader
        addPath={hasRole('addDeliveryProvider') && '/delivery-provider/new'}
      >
        <ProvidersFilter
          providerType={deliveryProviderType?.map(({ value }) => value)}
        />
      </ListHeader>
      {loading ? (
        <Loading />
      ) : (
        <ProvidersList
          editRole="editDeliveryProvider"
          deleteRole="removeDeliveryProvider"
          providerPath="/delivery-provider"
          providers={deliveryProviders}
          onRemove={onRemoveDeliveryProvider}
          enableDelete={hasRole('removeDeliveryProvider')}
          enableEdit={hasRole('editDeliveryProvider')}
        />
      )}
    </>
  );
};

export default DeliveryProviders;
