import { useRouter } from 'next/router';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';

import NewProviderForm from '../../modules/common/components/NewProviderForm';
import PageHeader from '../../modules/common/components/PageHeader';
import { convertArrayOfObjectToObject } from '../../modules/common/convertArrayOfObjectToObject';
import useCreatePaymentProvider from '../../modules/payment-providers/hooks/useCreatePaymentProvider';
import usePaymentInterfacesByType from '../../modules/payment-providers/hooks/usePaymentInterfacesByType';
import usePaymentProviderTypes from '../../modules/payment-providers/hooks/usePaymentProviderTypes';

const NewPaymentProvider = () => {
  const [selectedType, setSelectedType] = useState('INVOICE');
  const { formatMessage } = useIntl();

  const { createPaymentProvider } = useCreatePaymentProvider();
  const { paymentProviderType } = usePaymentProviderTypes();
  const { paymentInterfaces } = usePaymentInterfacesByType({
    type: selectedType,
  });
  const onSubmit = async ({ adapterKey, type }) => {
    await createPaymentProvider({ adapterKey, type });
    return true;
  };

  const { push } = useRouter();

  const onSubmitSuccess = () => {
    push('/payment-provider');
  };

  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'new_payment_provider_header',
          defaultMessage: 'New payment provider',
        })}
      />
      <NewProviderForm
        providerInterfaces={convertArrayOfObjectToObject(
          paymentInterfaces,
          'label',
          'value',
        )}
        providerTypes={convertArrayOfObjectToObject(
          paymentProviderType,
          'label',
          'value',
        )}
        onSubmit={onSubmit}
        onSubmitSuccess={onSubmitSuccess}
        onProviderChange={(current) => setSelectedType(current)}
      />
    </>
  );
};

export default NewPaymentProvider;
