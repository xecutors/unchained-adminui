import { useState } from 'react';
import { useIntl } from 'react-intl';
import Layout from '../../modules/common/components/Layout';
import ProviderList from '../../modules/common/components/ProvidersList';

import useDeliveryProviders from '../../modules/delivery-provider/hooks/useDeliveryProviders';
import useRemoveDeliveryProvider from '../../modules/delivery-provider/hooks/useRemoveDeliveryProvider';

const DeliveryProviders = ({ ...pageProps }) => {
  const [type, setType] = useState(null);
  const { formatMessage } = useIntl();
  const { deliveryProviders } = useDeliveryProviders({ type });
  const { removeDeliveryProvider } = useRemoveDeliveryProvider();

  const onRemoveDeliveryProvider = async (deliveryProviderId) => {
    await removeDeliveryProvider({ deliveryProviderId });
  };

  return (
    <Layout
      {...pageProps}
      pageHeader={formatMessage({
        id: 'delivery_providers_header',
        defaultMessage: 'Delivery Providers',
      })}
    >
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
