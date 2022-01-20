import { useState } from 'react';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';

import ProviderList from '../../modules/common/components/ProvidersList';

import useDeliveryProviders from '../../modules/delivery-provider/hooks/useDeliveryProviders';
import useRemoveDeliveryProvider from '../../modules/delivery-provider/hooks/useRemoveDeliveryProvider';

const DeliveryProviders = () => {
  const [type, setType] = useState(null);
  const { formatMessage } = useIntl();

  const { deliveryProviders } = useDeliveryProviders({ type });
  const { removeDeliveryProvider } = useRemoveDeliveryProvider();

  const onRemoveDeliveryProvider = async (deliveryProviderId) => {
    await removeDeliveryProvider({ deliveryProviderId });
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
      <ProviderList
        providerPath="/delivery-provider"
        providerType={['PICKUP', 'SHIPPING']}
        providers={deliveryProviders}
        onRemove={onRemoveDeliveryProvider}
        onProviderFilterChange={setType}
      />
    </>
  );
};

export default DeliveryProviders;
