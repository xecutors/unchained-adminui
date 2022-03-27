import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';
import Loading from '../../modules/common/components/Loading';
import DangerMessage from '../../modules/modal/components/DangerMessage';
import useModal from '../../modules/modal/hooks/useModal';
import useRemoveDeliveryProvider from '../../modules/delivery-provider/hooks/useRemoveDeliveryProvider';
import useUpdateDeliveryProvider from '../../modules/delivery-provider/hooks/useUpdateDeliveryProvider';
import useDeliveryProvider from '../../modules/delivery-provider/hooks/useDeliveryProvider';
import ProviderDetail from '../../modules/common/components/ProviderDetail';
import HeaderDeleteButton from '../../modules/common/components/HeaderDeleteButton';
import { getInterfaceLabel } from '../../modules/common/utils/utils';

const DeliveryProviderUpdate = () => {
  const { formatMessage } = useIntl();
  const { push: routerPush, query } = useRouter();
  const { setModal } = useModal();

  const { deliveryProviderId } = query;

  const { removeDeliveryProvider } = useRemoveDeliveryProvider();
  const { updateDeliveryProvider } = useUpdateDeliveryProvider();

  const { deliveryProvider, loading } = useDeliveryProvider({
    deliveryProviderId,
  });

  const onSubmit = async ({ configuration: config }) => {
    await updateDeliveryProvider({
      configuration: JSON.parse(config || '[]'),
      deliveryProviderId,
    });
    return true;
  };

  const onSubmitSuccess = () => {
    routerPush('/delivery-provider');
  };

  const handleOnClick = async () => {
    await setModal(
      <DangerMessage
        message={formatMessage({
          id: 'delete_delivery_provider_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this delivery provider? ',
        })}
        onOkClick={async () => {
          setModal('');
          await removeDeliveryProvider({ deliveryProviderId });
          toast.success(
            formatMessage({
              id: 'delivery_provider_deleted',
              defaultMessage: 'Delivery provider deleted successfully',
            }),
          );
          routerPush('/delivery-provider');
        }}
        okText={formatMessage({
          id: 'delete_delivery_provider',
          defaultMessage: 'Delete delivery Provider',
        })}
      />,
    );
  };

  return (
    <>
      <BreadCrumbs
        currentPageTitle={getInterfaceLabel(deliveryProvider?.interface)}
      />
      <div className="align-center flex min-w-full justify-between">
        <PageHeader
          headerText={formatMessage({
            id: 'update_delivery_configuration',
            defaultMessage: 'Update delivery provider',
          })}
        />
        <HeaderDeleteButton onClick={handleOnClick} />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <ProviderDetail
          provider={deliveryProvider}
          onSubmit={onSubmit}
          onSubmitSuccess={onSubmitSuccess}
        />
      )}
    </>
  );
};

export default DeliveryProviderUpdate;
