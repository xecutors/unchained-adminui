import { useQuery, gql } from '@apollo/client';
import OrderFragment from '../fragment/OrderFragment';

export const OrdersQuery = gql`
  query UserOrder($userId: ID) {
    user(userId: $userId) {
      orders {
        ...OrderFragment
      }
    }
  }
  ${OrderFragment}
`;

const useUserOrders = ({ userId = null } = {}) => {
  const { data, loading, error } = useQuery(OrdersQuery, {
    variables: { userId },
  });

  const orders = data?.user?.orders;

  return {
    orders,
    loading,
    error,
  };
};

export default useUserOrders;
