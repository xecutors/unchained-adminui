import Loading from '../../common/components/Loading';
import useOrders from '../hooks/useOrders';
import OrderList from './OrderList';

const LatestOrders = () => {
  const { orders, loading } = useOrders();

  return loading ? <Loading /> : <OrderList orders={orders} showUser />;
};

export default LatestOrders;
