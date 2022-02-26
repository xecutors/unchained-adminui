import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import useOrder from '../../modules/order/hooks/useOrder';
import OrderDetail from '../../modules/order/components/OrderDetail';

const OrderDetailPage = () => {
  const { formatMessage } = useIntl();
  const { query } = useRouter();
  const { orderId } = query;
  const { order, loading } = useOrder({ orderId });
  // console.log(order);
  return (
    <div className="mt-6 max-w-full">
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'order_detail',
          defaultMessage: 'Order Detail',
        })}
      />
      {loading ? <Loading /> : <OrderDetail order={order} />}
    </div>
  );
};

export default OrderDetailPage;
