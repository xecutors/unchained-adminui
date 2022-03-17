import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { XIcon } from '@heroicons/react/solid';

import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';
import Loading from '../../modules/common/components/Loading';
import DangerMessage from '../../modules/modal/components/DangerMessage';
import useModal from '../../modules/modal/hooks/useModal';
import useRemoveDeliveryProvider from '../../modules/delivery-provider/hooks/useRemoveDeliveryProvider';
import useUpdateDeliveryProvider from '../../modules/delivery-provider/hooks/useUpdateDeliveryProvider';
import useDeliveryProvider from '../../modules/delivery-provider/hooks/useDeliveryProvider';
import ProviderDetail from '../../modules/common/components/ProviderDetail';

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
          id: 'delete_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this deliver provider? ',
        })}
        onOkClick={async () => {
          setModal('');
          await removeDeliveryProvider({ deliveryProviderId });
          toast.success(
            formatMessage(
              {
                id: 'delivery_provider_deleted',
                defaultMessage:
                  'Delivery provider {deliveryProviderId} deleted successfully',
              },
              {
                deliveryProviderId,
              },
            ),
          );
          routerPush('/delivery-provider');
        }}
        okText={formatMessage({
          id: 'delete_delivery_provider',
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
        <button
          type="button"
          onClick={handleOnClick}
          className="flex justify-center items-center bg-red-400 text-white my-auto h-full rounded px-3 py-2 border border-transparent shadow-sm text-sm font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
        >
          <span className="pr-1">
            <XIcon className="inline-block h-4 w-4" />
          </span>
          <span>
            {formatMessage({
              id: 'deliver_provider_delete',
              defaultMessage: 'Delete',
            })}
          </span>
        </button>
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
