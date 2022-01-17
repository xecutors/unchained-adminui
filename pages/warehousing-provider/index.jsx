import { useState } from 'react';
import { useIntl } from 'react-intl';

import Layout from '../../modules/common/components/Layout';
import ProvidersList from '../../modules/common/components/ProvidersList';
import useRemoveWarehousingProvider from '../../modules/warehousing-providers/hooks/useRemoveWarehousingProvider';
import useWarehousingProviders from '../../modules/warehousing-providers/hooks/useWarehousingProviders';

const WarehousingProviders = ({ ...pageProps }) => {
  const [type, setType] = useState(null);
  const { formatMessage } = useIntl();
  const { warehousingProviders } = useWarehousingProviders({ type });
  const { removePaymentProvider } = useRemoveWarehousingProvider();

  const onRemoveWarehousingProvider = async (paymentProviderId) => {
    await removePaymentProvider({ paymentProviderId });
    return true;
  };

  return (
    <Layout
      {...pageProps}
      pageHeader={formatMessage({
        id: 'warehousing_providers_header',
        defaultMessage: 'Warehousing Providers',
      })}
    >
      <ProvidersList
        providerType={['PHYSICAL']}
        providerPath="/warehousing-provider"
        providers={warehousingProviders}
        onRemove={onRemoveWarehousingProvider}
        onProviderFilterChange={setType}
      />
    </Layout>
  );
};

export default WarehousingProviders;
