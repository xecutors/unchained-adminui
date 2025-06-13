import { toast } from 'react-toastify';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import usePaymentProviders from '../../modules/payment-providers/hooks/usePaymentProviders';
import useRemovePaymentProvider from '../../modules/payment-providers/hooks/useRemovePaymentProvider';
import ProvidersList from '../../modules/common/components/ProvidersList';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';
import useModal from '../../modules/modal/hooks/useModal';
import DangerMessage from '../../modules/modal/components/DangerMessage';
import Loading from '../../modules/common/components/Loading';
import ListHeader from '../../modules/common/components/ListHeader';
import ProvidersFilter from '../../modules/common/components/ProvidersFilter';
import usePaymentProviderTypes from '../../modules/payment-providers/hooks/usePaymentProviderTypes';
import useAuth from '../../modules/Auth/useAuth';
import { IPaymentProviderType } from '../../gql/types';
import PaymentProviderDetailPage from './PaymentProviderDetailPage';

const PaymentProviders = () => {
  const { formatMessage } = useIntl();
  const router = useRouter();
  const { query } = router;
  const { type, paymentProviderId } = query;
  const { paymentProviders, paymentProvidersCount, loading } =
    usePaymentProviders({
      type: type as IPaymentProviderType,
    });
  const { setModal } = useModal();
  const { removePaymentProvider } = useRemovePaymentProvider();
  const { paymentProviderType } = usePaymentProviderTypes();
  const { hasRole } = useAuth();

  const onRemovePaymentProvider = async (paymentProviderId) => {
    await setModal(
      <DangerMessage
        onCancelClick={() => setModal('')}
        message={formatMessage({
          id: 'delete_paymentProvider_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this Payment provider? ',
        })}
        onOkClick={async () => {
          setModal('');
          await removePaymentProvider({ paymentProviderId });
          toast.success(
            formatMessage({
              id: 'payment_provider_deleted',
              defaultMessage: 'Payment provider deleted successfully',
            }),
          );
        }}
        okText={formatMessage({
          id: 'delete_payment_provider',
          defaultMessage: 'Delete payment provider',
        })}
      />,
    );
  };

  if (paymentProviderId)
    return <PaymentProviderDetailPage paymentProviderId={paymentProviderId} />;
  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'payment_providers_header',
          defaultMessage: 'Payment providers',
        })}
      />
      <ListHeader
        addPath={hasRole('addPaymentProvider') && '/payment-provider/new'}
        totalRecords={paymentProvidersCount}
      >
        <ProvidersFilter
          providerType={paymentProviderType?.map(({ value }) => value)}
        />
      </ListHeader>
      {loading ? (
        <Loading />
      ) : (
        <ProvidersList
          providerPath="/payment-provider?paymentProviderId"
          providers={paymentProviders}
          onRemove={onRemovePaymentProvider}
          canDelete={hasRole('removePaymentProvider')}
          canEdit={hasRole('editPaymentProvider')}
        />
      )}
    </>
  );
};

export default PaymentProviders;
