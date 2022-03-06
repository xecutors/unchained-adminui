import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { XIcon } from '@heroicons/react/solid';

import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';
import Loading from '../../modules/common/components/Loading';
import ProviderDetail from '../../modules/common/components/ProviderDetail';
import DeleteButton from '../../modules/common/components/DeleteButton';
import useDeliveryProvider from '../../modules/delivery-provider/hooks/useDeliveryProvider';

const DeliveryProviderUpdate = () => {
  const { query } = useRouter();
  const { formatMessage } = useIntl();
  const { id } = query;

  const { deliveryProvider, loading } = useDeliveryProvider({
    deliveryProviderId: id,
  });

  const handleOnClick = async () => {
    await setModal(
      <DangerMessage
        message={formatMessage({
          id: 'delete_order_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this order? ',
        })}
        onOkClick={async () => {
          setModal('');
          await removeOrder({ orderId });
          toast.success(
            formatMessage(
              {
                id: 'order_deleted',
                defaultMessage: 'Order {orderId} deleted successfully',
              },
              {
                orderId,
              },
            ),
          );
        }}
        okText={formatMessage({
          id: 'delete_order',
          defaultMessage: 'Delete order',
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
          className={
            'flex justify-center items-center bg-red-400 text-white rounded-md px-3 py-2 border border-transparent shadow-sm text-sm font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400'
          }
        />
      </div>
      {loading ? <Loading /> : <ProviderDetail provider={deliveryProvider} />}
    </>
  );
};

export default DeliveryProviderUpdate;
