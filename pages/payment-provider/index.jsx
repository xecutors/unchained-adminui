import { useState } from 'react';
import Layout from '../../modules/common/components/Layout';
import usePaymentProviders from '../../modules/payment-providers/hooks/usePaymentProviders';
import PaymentProviderList from '../../modules/payment-providers/components/PaymentProviderList';
import useRemovePaymentProvider from '../../modules/payment-providers/hooks/useRemovePaymentProvider';

const PaymentProviders = ({ ...pageProps }) => {
  const [type, setType] = useState(null);
  const { paymentProviders } = usePaymentProviders({ type });
  const { removePaymentProvider } = useRemovePaymentProvider();

  const onRemovePaymentProvider = async (paymentProviderId) => {
    await removePaymentProvider({ paymentProviderId });
  };

  return (
    <Layout {...pageProps}>
      <PaymentProviderList
        providers={paymentProviders}
        onRemove={onRemovePaymentProvider}
        onProviderFilterChange={setType}
      />
    </Layout>
  );
};

export default PaymentProviders;
