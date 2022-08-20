import React from 'react';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';
import usePaymentProvider from '../../modules/payment-providers/hooks/usePaymentProvider';
import useRemovePaymentProvider from '../../modules/payment-providers/hooks/useRemovePaymentProvider';
import useUpdatePaymentProvider from '../../modules/payment-providers/hooks/useUpdatePaymentProvider';
import Loading from '../../modules/common/components/Loading';
import DangerMessage from '../../modules/modal/components/DangerMessage';
import useModal from '../../modules/modal/hooks/useModal';
import ProviderDetail from '../../modules/common/components/ProviderDetail';
import HeaderDeleteButton from '../../modules/common/components/HeaderDeleteButton';
import { getInterfaceLabel } from '../../modules/common/utils/utils';
import ACTION_ROLES from '../../modules/common/data/roles';
import useAuth from '../../modules/Auth/useAuth';

const PaymentProviderUpdate = () => {
  const { formatMessage } = useIntl();
  const { setModal } = useModal();
  const { push: routerPush, query } = useRouter();
  const { hasRole } = useAuth();
  const { paymentProviderId } = query;

  const { updatePaymentProvider } = useUpdatePaymentProvider();
  const { removePaymentProvider } = useRemovePaymentProvider();

  const { paymentProvider, loading } = usePaymentProvider({
    paymentProviderId,
  });

  const onSubmit = async ({ configuration: config }) => {
    await updatePaymentProvider({
      configuration: JSON.parse(config || '[]'),
      paymentProviderId,
    });
    return true;
  };

  const onSubmitSuccess = () => {
    routerPush('/payment-provider');
  };

  const handleOnClick = async () => {
    await setModal(
      <DangerMessage
        message={formatMessage({
          id: 'delete_payment_provider_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this payment provider? ',
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
          routerPush('/payment-provider');
        }}
        okText={formatMessage({
          id: 'delete_payment_provider',
          defaultMessage: 'Delete payment provider',
        })}
      />,
    );
  };

  return (
    <>
      <BreadCrumbs
        currentPageTitle={getInterfaceLabel(paymentProvider?.interface)}
      />
      <div className="align-center flex min-w-full justify-between">
        <PageHeader
          headerText={formatMessage({
            id: 'update_payment_provider_header',
            defaultMessage: 'Update payment provider',
          })}
        />
        {hasRole(ACTION_ROLES.paymentProviders.delete) && (
          <HeaderDeleteButton onClick={handleOnClick} />
        )}
      </div>
      {loading ? (
        <Loading />
      ) : (
        <ProviderDetail
          readOnly={!hasRole(ACTION_ROLES.paymentProviders.update)}
          provider={paymentProvider}
          onSubmit={onSubmit}
          onSubmitSuccess={onSubmitSuccess}
        />
      )}
    </>
  );
};

export default PaymentProviderUpdate;
