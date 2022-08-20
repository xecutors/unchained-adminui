import React from 'react';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import useOrder from '../../modules/order/hooks/useOrder';
import OrderDetail from '../../modules/order/components/OrderDetail';
import DangerMessage from '../../modules/modal/components/DangerMessage';
import useModal from '../../modules/modal/hooks/useModal';
import useRemoveOrder from '../../modules/order/hooks/useRemoveOrder';
import HeaderDeleteButton from '../../modules/common/components/HeaderDeleteButton';
import ACTION_ROLES from '../../modules/common/data/roles';
import useAuth from '../../modules/Auth/useAuth';

const OrderDetailPage = () => {
  const { formatMessage } = useIntl();
  const { setModal } = useModal();
  const { removeOrder } = useRemoveOrder();
  const { query, ...router } = useRouter();
  const { hasRole } = useAuth();
  const { orderId } = query;
  const { order, loading } = useOrder({ orderId });

  const isDeletable = (status) => {
    return status === 'OPEN';
  };

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
            formatMessage({
              id: 'order_deleted',
              defaultMessage: 'Order deleted successfully',
            }),
          );
          router.push('/orders');
        }}
        okText={formatMessage({
          id: 'delete_order',
          defaultMessage: 'Delete order',
        })}
      />,
    );
  };

  return (
    <div className="mt-6 max-w-full">
      <BreadCrumbs
        currentPageTitle={order?.orderNumber ? `#${order?.orderNumber}` : ''}
      />
      <div className="align-center flex min-w-full justify-between">
        <PageHeader
          headerText={formatMessage({
            id: 'order_detail',
            defaultMessage: 'Order Detail',
          })}
        />
        {order &&
        isDeletable(order.status) &&
        hasRole(ACTION_ROLES.orders.delete) ? (
          <HeaderDeleteButton onClick={handleOnClick} />
        ) : null}
      </div>
      {loading ? <Loading /> : <OrderDetail order={order} />}
    </div>
  );
};

export default OrderDetailPage;
