import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';
import Loading from '../../modules/common/components/Loading';
import ProviderDetail from '../../modules/common/components/ProviderDetail';
import DeleteButton from '../../modules/common/components/DeleteButton';
import DangerMessage from '../../modules/modal/components/DangerMessage';
import useModal from '../../modules/modal/hooks/useModal';
import useRemoveDeliveryProvider from '../../modules/delivery-provider/hooks/useRemoveDeliveryProvider';

import useDeliveryProvider from '../../modules/delivery-provider/hooks/useDeliveryProvider';
import ProviderConfigurationForm from '../../modules/common/components/ProviderConfigurationForm';
import useUpdateDeliveryProvider from '../../modules/delivery-provider/hooks/useUpdateDeliveryProvider';

const DeliveryProviderUpdate = () => {
  const { setModal } = useModal();
  const { removeDeliveryProvider } = useRemoveDeliveryProvider();
  const { query, ...router } = useRouter();
  const { formatMessage } = useIntl();
  const { id } = query;

  const { deliveryProvider, loading } = useDeliveryProvider({
    deliveryProviderId: id,
  });
  const { updateDeliveryProvider } = useUpdateDeliveryProvider();
  const onSubmit = async ({ configuration: config }) => {
    await updateDeliveryProvider({
      configuration: JSON.parse(config),
      deliveryProviderId: id,
    });
    return true;
  };

  const onSubmitSuccess = () => {
    router.push('/delivery-provider');
  };
  const handleOnClick = async () => {
    await setModal(
      <DangerMessage
        message={formatMessage({
          id: 'delete_provider_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this deliver provider? ',
        })}
        onOkClick={async () => {
          setModal('');
          await removeDeliveryProvider({ id });
          toast.success(
            formatMessage(
              {
                id: 'provider_deleted',
                defaultMessage: 'Delivery provider {id} deleted successfully',
              },
              {
                id,
              },
            ),
          );
        }}
        okText={formatMessage({
          id: 'delete_provider',
          defaultMessage: 'Delete Delivery Provider',
        })}
      />,
    );
  };

  return (
    <>
      <BreadCrumbs />
      <div className="flex align-center justify-between min-w-full">
        <PageHeader
          headerText={formatMessage({
            id: 'update_delivery_configuration',
            defaultMessage: 'Update delivery provider',
          })}
        />
        <DeleteButton
          onClick={handleOnClick}
          textRight="Delete"
          className="flex justify-center items-center bg-red-400  rounded-md px-1 py-1 border border-transparent shadow-sm text-sm font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 text-white"
        />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <ProviderConfigurationForm
          onSubmit={onSubmit}
          onSubmitSuccess={onSubmitSuccess}
          defaultValue={deliveryProvider?.configuration || {}}
        />
      )}
    </>
  );
};

export default DeliveryProviderUpdate;
