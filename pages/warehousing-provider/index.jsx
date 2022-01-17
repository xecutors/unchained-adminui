import { useState } from 'react';

import ProvidersList from '../../modules/common/components/ProvidersList';
import useRemoveWarehousingProvider from '../../modules/warehousing-providers/hooks/useRemoveWarehousingProvider';
import useWarehousingProviders from '../../modules/warehousing-providers/hooks/useWarehousingProviders';

const WarehousingProviders = () => {
  const [type, setType] = useState(null);

  const { warehousingProviders } = useWarehousingProviders({ type });
  const { removePaymentProvider } = useRemoveWarehousingProvider();

  const onRemoveWarehousingProvider = async (paymentProviderId) => {
    await removePaymentProvider({ paymentProviderId });
    return true;
  };

  return (
    <ProvidersList
      providerType={['PHYSICAL']}
      providerPath="/warehousing-provider"
      providers={warehousingProviders}
      onRemove={onRemoveWarehousingProvider}
      onProviderFilterChange={setType}
    />
  );
};

export default WarehousingProviders;
