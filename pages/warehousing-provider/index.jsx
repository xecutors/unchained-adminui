import { useState } from 'react';

import Layout from '../../modules/common/components/Layout';
import usePaymentProviders from '../../modules/payment-providers/hooks/usePaymentProviders';
import useRemovePaymentProvider from '../../modules/payment-providers/hooks/useRemovePaymentProvider';
import ProviderList from '../../modules/common/components/ProvidersList';

const PaymentProviders = ({ ...pageProps }) => {
  const [type, setType] = useState(null);
  const { paymentProviders } = usePaymentProviders({ type });
  const { removePaymentProvider } = useRemovePaymentProvider();

  const onRemovePaymentProvider = async (paymentProviderId) => {
    await removePaymentProvider({ paymentProviderId });
  };

  return (
    <Layout {...pageProps}>
      <ProviderList
        providerType={['CARD', 'INVOICE', 'GENERIC']}
        providerPath="/payment-provider"
        providers={paymentProviders}
        onRemove={onRemovePaymentProvider}
        onProviderFilterChange={setType}
      />
    </Layout>
  );
};

export default PaymentProviders;
