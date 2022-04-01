import { useRouter } from 'next/router';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';

import NewProviderForm from '../../modules/common/components/NewProviderForm';
import PageHeader from '../../modules/common/components/PageHeader';
import { convertArrayOfObjectToObject } from '../../modules/common/convertArrayOfObjectToObject';
import useCreateDeliveryProvider from '../../modules/delivery-provider/hooks/useCreateDeliveryProvider';
import useDeliveryInterfacesByType from '../../modules/delivery-provider/hooks/useDeliveryInterfacesByType';
import useDeliveryProviderTypes from '../../modules/delivery-provider/hooks/useDeliveryProviderTypes';

const NewDeliveryProvider = () => {
  const [selectedType, setSelectedType] = useState('SHIPPING');
  const { formatMessage } = useIntl();
  const { createDeliveryProvider } = useCreateDeliveryProvider();
  const { deliveryProviderType } = useDeliveryProviderTypes();
  const { deliveryInterfaces } = useDeliveryInterfacesByType({
    type: selectedType,
  });
  const onSubmit = async ({ adapterKey, type }) => {
    const { data }= await createDeliveryProvider({ adapterKey, type });
    return { success: true, data: data?.createDeliveryProvider };
  };

  const router = useRouter();

  const onSubmitSuccess = (_id) => {
    
    router.push(`/delivery-provider/${_id}`);
  };

  return (
    <>
      <BreadCrumbs />
      <div className="mx-auto sm:max-w-2xl">
        <PageHeader
          headerText={formatMessage({
            id: 'new_delivery_provider',
            defaultMessage: 'New delivery provider',
          })}
        />
        <div className="mt-6">
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
        </div>
      </div>
    </>
  );
};

export default NewDeliveryProvider;
