import { useRouter } from 'next/router';
import { useState } from 'react';

import NewProviderForm from '../../modules/common/components/NewProviderForm';
import { convertArrayOfObjectToObject } from '../../modules/common/convertArrayOfObjectToObject';
import useCreateWarehousingProvider from '../../modules/warehousing-providers/hooks/useCreateWarehousingProvider';
import useWarehousingInterfacesByType from '../../modules/warehousing-providers/hooks/useWarehousingInterfacesByType';
import useWarehousingProviderTypes from '../../modules/warehousing-providers/hooks/useWarehousingProviderTypes';

const NewPaymentProvider = () => {
  const [selectedType, setSelectedType] = useState('PHYSICAL');

  const { createWarehousingProvider } = useCreateWarehousingProvider();
  const { warehousingProviderType } = useWarehousingProviderTypes();
  const { warehousingInterfaces } = useWarehousingInterfacesByType({
    type: selectedType,
  });
  const onSubmit = async ({ adapterKey, type }) => {
    await createWarehousingProvider({ adapterKey, type });
    return true;
  };

  const { push } = useRouter();

  const onSubmitSuccess = () => {
    push('/warehousing-provider');
  };

  return (
    <NewProviderForm
      providerInterfaces={convertArrayOfObjectToObject(
        warehousingInterfaces,
        'label',
        'value',
      )}
      providerTypes={convertArrayOfObjectToObject(
        warehousingProviderType,
        'label',
        'value',
      )}
      onSubmit={onSubmit}
      onSubmitSuccess={onSubmitSuccess}
      onProviderChange={(current) => setSelectedType(current)}
    />
  );
};

export default NewPaymentProvider;
