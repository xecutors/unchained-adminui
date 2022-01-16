import { useState } from 'react';
import Layout from '../../modules/common/components/Layout';
import ProviderList from '../../modules/common/components/ProvidersList';

import useDeliveryProviders from '../../modules/delivery-provider/hooks/useDeliveryProviders';
import useRemoveDeliveryProvider from '../../modules/delivery-provider/hooks/useRemoveDeliveryProvider';

const DeliveryProviders = ({ ...pageProps }) => {
  const [type, setType] = useState(null);
  const { deliveryProviders } = useDeliveryProviders({ type });
  const { removeDeliveryProvider } = useRemoveDeliveryProvider();

  const onRemoveDeliveryProvider = async (deliveryProviderId) => {
    await removeDeliveryProvider({ deliveryProviderId });
  };

  return (
    <Layout {...pageProps}>
      <ProviderList
        providerPath="/delivery-provider"
        providerType={['PICKUP', 'SHIPPING']}
        providers={deliveryProviders}
        onRemove={onRemoveDeliveryProvider}
        onProviderFilterChange={setType}
      />
    </Layout>
  );
};

export default DeliveryProviders;
