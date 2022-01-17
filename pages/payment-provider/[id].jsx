import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

import FormHeader from '../../modules/common/components/FormHeader';
import Layout from '../../modules/common/components/Layout';
import ProviderConfigurationForm from '../../modules/common/components/ProviderConfigurationForm';
import usePaymentProvider from '../../modules/payment-providers/hooks/usePaymentProvider';
import useRemovePaymentProvider from '../../modules/payment-providers/hooks/useRemovePaymentProvider';
import useUpdatePaymentProvider from '../../modules/payment-providers/hooks/useUpdatePaymentProvider';

const PaymentProviderUpdate = ({ ...pageProps }) => {
  const { push: routerPush, query } = useRouter();
  const { formatMessage } = useIntl();
  const { id } = query;

  const { updatePaymentProvider } = useUpdatePaymentProvider();
  const { removePaymentProvider } = useRemovePaymentProvider();
  const { paymentProvider } = usePaymentProvider({
    paymentProviderId: id,
  });

  const onSubmit = async ({ configuration }) => {
    await updatePaymentProvider({
      configuration,
      paymentProviderId: id,
    });
    return true;
  };

  const onSubmitSuccess = () => {
    routerPush('/payment-provider');
  };

  const onRemovePaymentProvider = async () => {
    await removePaymentProvider({ paymentProviderId: id });
    routerPush('/payment-provider');
  };

  return (
    <Layout
      {...pageProps}
      pageHeader={formatMessage({
        id: 'payment_provider_header',
        defaultMessage: 'Payment Provider',
      })}
    >
      <FormHeader
        onDelete={onRemovePaymentProvider}
        headerText={formatMessage({
          id: 'update_configuration',
          defaultMessage: 'Update configuration',
        })}
      />
      <ProviderConfigurationForm
        onSubmit={onSubmit}
        onSubmitSuccess={onSubmitSuccess}
        defaultValue={paymentProvider?.configuration || []}
      />
    </Layout>
  );
};

export default PaymentProviderUpdate;
