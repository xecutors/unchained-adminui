import { useState } from 'react';

import usePaymentProviders from '../../modules/payment-providers/hooks/usePaymentProviders';
import useRemovePaymentProvider from '../../modules/payment-providers/hooks/useRemovePaymentProvider';
import ProvidersList from '../../modules/common/components/ProvidersList';

const PaymentProviders = () => {
  const [type, setType] = useState(null);
  const { paymentProviders } = usePaymentProviders({ type });
  const { removePaymentProvider } = useRemovePaymentProvider();

  const onRemovePaymentProvider = async (paymentProviderId) => {
    await removePaymentProvider({ paymentProviderId });
  };

  return (
    <ProvidersList
      providerType={['CARD', 'INVOICE', 'GENERIC']}
      providerPath="/payment-provider"
      providers={paymentProviders}
      onRemove={onRemovePaymentProvider}
      onProviderFilterChange={setType}
    />
  );
};

export default PaymentProviders;
