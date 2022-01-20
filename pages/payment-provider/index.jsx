import { useState } from 'react';

import { useIntl } from 'react-intl';
import usePaymentProviders from '../../modules/payment-providers/hooks/usePaymentProviders';
import useRemovePaymentProvider from '../../modules/payment-providers/hooks/useRemovePaymentProvider';
import ProvidersList from '../../modules/common/components/ProvidersList';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';

const PaymentProviders = () => {
  const { formatMessage } = useIntl();
  const [type, setType] = useState(null);
  const { paymentProviders } = usePaymentProviders({ type });
  const { removePaymentProvider } = useRemovePaymentProvider();

  const onRemovePaymentProvider = async (paymentProviderId) => {
    await removePaymentProvider({ paymentProviderId });
  };

  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'payment_providers_header',
          defaultMessage: 'Payment providers',
        })}
      />
      <ProvidersList
        providerType={['CARD', 'INVOICE', 'GENERIC']}
        providerPath="/payment-provider"
        providers={paymentProviders}
        onRemove={onRemovePaymentProvider}
        onProviderFilterChange={setType}
      />
    </>
  );
};

export default PaymentProviders;
