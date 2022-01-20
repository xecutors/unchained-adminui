import { useState } from 'react';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';

import ProvidersList from '../../modules/common/components/ProvidersList';
import useRemoveWarehousingProvider from '../../modules/warehousing-providers/hooks/useRemoveWarehousingProvider';
import useWarehousingProviders from '../../modules/warehousing-providers/hooks/useWarehousingProviders';

const WarehousingProviders = () => {
  const [type, setType] = useState(null);
  const { formatMessage } = useIntl();

  const { warehousingProviders } = useWarehousingProviders({ type });
  const { removePaymentProvider } = useRemoveWarehousingProvider();

  const onRemoveWarehousingProvider = async (paymentProviderId) => {
    await removePaymentProvider({ paymentProviderId });
    return true;
  };

  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'warehousing_providers_header',
          defaultMessage: 'Warehousing providers',
        })}
      />
      <ProvidersList
        providerType={['PHYSICAL']}
        providerPath="/warehousing-provider"
        providers={warehousingProviders}
        onRemove={onRemoveWarehousingProvider}
        onProviderFilterChange={setType}
      />
    </>
  );
};

export default WarehousingProviders;
