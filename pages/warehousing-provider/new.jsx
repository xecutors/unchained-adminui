import { useRouter } from 'next/router';
import { useState } from 'react';

import Layout from '../../modules/common/components/Layout';
import NewProviderForm from '../../modules/common/components/NewProviderForm';
import { convertArrayOfObjectToObject } from '../../modules/common/convertArrayOfObjectToObject';
import useCreatePaymentProvider from '../../modules/payment-providers/hooks/useCreatePaymentProvider';
import usePaymentInterfacesByType from '../../modules/payment-providers/hooks/usePaymentInterfacesByType';
import usePaymentProviderTypes from '../../modules/payment-providers/hooks/usePaymentProviderTypes';

const NewPaymentProvider = ({ ...pageProps }) => {
  const [selectedType, setSelectedType] = useState('INVOICE');

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
    <Layout {...pageProps}>
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
    </Layout>
  );
};

export default NewPaymentProvider;
