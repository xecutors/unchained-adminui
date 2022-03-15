import { useState } from 'react';
import { toast } from 'react-toastify';
import { useIntl } from 'react-intl';
import usePaymentProviders from '../../modules/payment-providers/hooks/usePaymentProviders';
import useRemovePaymentProvider from '../../modules/payment-providers/hooks/useRemovePaymentProvider';
import ProvidersList from '../../modules/common/components/ProvidersList';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';
import useModal from '../../modules/modal/hooks/useModal';
import DangerMessage from '../../modules/modal/components/DangerMessage';

const PaymentProviders = () => {
  const { formatMessage } = useIntl();
  const [type, setType] = useState(null);
  const { paymentProviders } = usePaymentProviders({ type });
  const { setModal } = useModal();
  const { removePaymentProvider } = useRemovePaymentProvider();

  const onRemovePaymentProvider = async (paymentProviderId) => {
    await setModal(
      <DangerMessage
        message={formatMessage({
          id: 'delete_paymentProvider_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this Payment provider? ',
        })}
        onOkClick={async () => {
          setModal('');
          await removePaymentProvider({ paymentProviderId });
          toast.success(
            formatMessage(
              {
                id: 'payment_provider_deleted',
                defaultMessage: 'Payment provider {id} deleted successfully',
              },
              {
                id: paymentProviderId,
              },
            ),
          );
        }}
        okText={formatMessage({
          id: 'delete_payment_provider',
          defaultMessage: 'Delete paymentProvider',
        })}
      />,
    );
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
