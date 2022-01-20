import { useQuery, gql } from '@apollo/client';
import OrderFragment from '../fragment/OrderFragment';

export const OrdersQuery = gql`
  query UserOrder($userId: ID, $includeCarts: Boolean) {
    user(userId: $userId, includeCarts: $includeCarts) {
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
