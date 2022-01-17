import { useRouter } from 'next/router';
import { useState } from 'react';

import NewProviderForm from '../../modules/common/components/NewProviderForm';
import { convertArrayOfObjectToObject } from '../../modules/common/convertArrayOfObjectToObject';
import useCreateDeliveryProvider from '../../modules/delivery-provider/hooks/useCreateDeliveryProvider';
import useDeliveryInterfacesByType from '../../modules/delivery-provider/hooks/useDeliveryInterfacesByType';
import useDeliveryProviderTypes from '../../modules/delivery-provider/hooks/useDeliveryProviderTypes';

const NewDeliveryProvider = () => {
  const [selectedType, setSelectedType] = useState('SHIPPING');

  const { createDeliveryProvider } = useCreateDeliveryProvider();
  const { deliveryProviderType } = useDeliveryProviderTypes();
  const { deliveryInterfaces } = useDeliveryInterfacesByType({
    type: selectedType,
  });
  const onSubmit = async ({ adapterKey, type }) => {
    await createDeliveryProvider({ adapterKey, type });
    return true;
  };

  const { push } = useRouter();

  const onSubmitSuccess = () => {
    push('/delivery-provider');
  };

  return (
    <>
      <NewProviderForm
        providerInterfaces={convertArrayOfObjectToObject(
          deliveryInterfaces,
          'label',
          'value',
        )}
        providerTypes={convertArrayOfObjectToObject(
          deliveryProviderType,
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

export default NewDeliveryProvider;
