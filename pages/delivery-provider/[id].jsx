import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

import FormHeader from '../../modules/common/components/FormHeader';
import Layout from '../../modules/common/components/Layout';
import ProviderConfigurationForm from '../../modules/common/components/ProviderConfigurationForm';
import useDeliveryProvider from '../../modules/delivery-provider/hooks/useDeliveryProvider';
import useRemoveDeliveryProvider from '../../modules/delivery-provider/hooks/useRemoveDeliveryProvider';
import useUpdateDeliveryProvider from '../../modules/delivery-provider/hooks/useUpdateDeliveryProvider';

const DeliveryProviderUpdate = ({ ...pageProps }) => {
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
    <Layout
      {...pageProps}
      pageHeader={formatMessage({
        id: 'delivery_provider_header',
        defaultMessage: 'Delivery Provider',
      })}
    >
      <FormHeader
        onDelete={onRemoveDeliveryProvider}
        headerText={formatMessage({
          id: 'update_configuration',
          defaultMessage: 'Update configuration',
        })}
      />
      <ProviderConfigurationForm
        onSubmit={onSubmit}
        onSubmitSuccess={onSubmitSuccess}
        defaultValue={deliveryProvider?.configuration || []}
      />
    </Layout>
  );
};

export default DeliveryProviderUpdate;
