import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';

import FormHeader from '../../modules/common/components/FormHeader';
import PageHeader from '../../modules/common/components/PageHeader';
import ProviderConfigurationForm from '../../modules/common/components/ProviderConfigurationForm';
import usePaymentProvider from '../../modules/payment-providers/hooks/usePaymentProvider';
import useRemovePaymentProvider from '../../modules/payment-providers/hooks/useRemovePaymentProvider';
import useUpdatePaymentProvider from '../../modules/payment-providers/hooks/useUpdatePaymentProvider';

const PaymentProviderUpdate = () => {
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
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'update_payment_provider_header',
          defaultMessage: 'Update payment provider',
        })}
      />
      <FormHeader onDelete={onRemovePaymentProvider}>
        <ProviderConfigurationForm
          onSubmit={onSubmit}
          onSubmitSuccess={onSubmitSuccess}
          defaultValue={paymentProvider?.configuration || []}
        />
      </FormHeader>
    </>
  );
};

export default PaymentProviderUpdate;
