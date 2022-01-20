import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';

import FormHeader from '../../modules/common/components/FormHeader';
import PageHeader from '../../modules/common/components/PageHeader';

import ProviderConfigurationForm from '../../modules/common/components/ProviderConfigurationForm';
import useDeliveryProvider from '../../modules/delivery-provider/hooks/useDeliveryProvider';
import useRemoveDeliveryProvider from '../../modules/delivery-provider/hooks/useRemoveDeliveryProvider';
import useUpdateDeliveryProvider from '../../modules/delivery-provider/hooks/useUpdateDeliveryProvider';

const DeliveryProviderUpdate = () => {
  const { push: routerPush, query } = useRouter();
  const { formatMessage } = useIntl();
  const { id } = query;

  const { updateDeliveryProvider } = useUpdateDeliveryProvider();
  const { removeDeliveryProvider } = useRemoveDeliveryProvider();
  const { deliveryProvider } = useDeliveryProvider({
    deliveryProviderId: id,
  });

  const onSubmit = async ({ configuration }) => {
    await updateDeliveryProvider({
      configuration,
      deliveryProviderId: id,
    });
    return true;
  };

  const onSubmitSuccess = () => {
    routerPush('/delivery-provider');
  };

  const onRemoveDeliveryProvider = async () => {
    await removeDeliveryProvider({ deliveryProviderId: id });
    routerPush('/delivery-provider');
  };

  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'update_delivery_configuration',
          defaultMessage: 'Update delivery provider',
        })}
      />
      <FormHeader onDelete={onRemoveDeliveryProvider}>
        <ProviderConfigurationForm
          onSubmit={onSubmit}
          onSubmitSuccess={onSubmitSuccess}
          defaultValue={deliveryProvider?.configuration || []}
        />
      </FormHeader>
    </>
  );
};

export default DeliveryProviderUpdate;
