import { useState } from 'react';

import ProviderList from '../../modules/common/components/ProvidersList';

import useDeliveryProviders from '../../modules/delivery-provider/hooks/useDeliveryProviders';
import useRemoveDeliveryProvider from '../../modules/delivery-provider/hooks/useRemoveDeliveryProvider';

const DeliveryProviders = () => {
  const [type, setType] = useState(null);

  const { deliveryProviders } = useDeliveryProviders({ type });
  const { removeDeliveryProvider } = useRemoveDeliveryProvider();

  const onRemoveDeliveryProvider = async (deliveryProviderId) => {
    await removeDeliveryProvider({ deliveryProviderId });
  };

  return (
    <ProviderList
      providerPath="/delivery-provider"
      providerType={['PICKUP', 'SHIPPING']}
      providers={deliveryProviders}
      onRemove={onRemoveDeliveryProvider}
      onProviderFilterChange={setType}
    />
  );
};

export default DeliveryProviders;
