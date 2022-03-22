import { useState } from 'react';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import ProviderList from '../../modules/common/components/ProvidersList';
import useDeliveryProviders from '../../modules/delivery-provider/hooks/useDeliveryProviders';
import useRemoveDeliveryProvider from '../../modules/delivery-provider/hooks/useRemoveDeliveryProvider';
import DangerMessage from '../../modules/modal/components/DangerMessage';
import useModal from '../../modules/modal/hooks/useModal';

const DeliveryProviders = () => {
  const [type, setType] = useState(null);
  const { formatMessage } = useIntl();

  const { deliveryProviders, loading } = useDeliveryProviders({ type });
  const { setModal } = useModal();
  const { removeDeliveryProvider } = useRemoveDeliveryProvider();

  const onRemoveDeliveryProvider = async (deliveryProviderId) => {
    await setModal(
      <DangerMessage
        message={formatMessage({
          id: 'delete_delivery_providers_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this Delivery Providers? ',
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
          id: 'delete_delivery_providers',
          defaultMessage: 'Delete delivery providers',
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
      {loading ? (
        <Loading />
      ) : (
        <ProviderList
          providerPath="/delivery-provider"
          providerType={['PICKUP', 'SHIPPING']}
          providers={deliveryProviders}
          onRemove={onRemoveDeliveryProvider}
          onProviderFilterChange={setType}
        />
      )}
    </>
  );
};

export default DeliveryProviders;
