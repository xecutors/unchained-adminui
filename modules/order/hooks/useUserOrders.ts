import { useQuery, gql } from '@apollo/client';
import OrderFragment from '../fragments/OrderFragment';

export const UserOrdersQuery = gql`
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
  const { data, loading, error } = useQuery(UserOrdersQuery, {
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
