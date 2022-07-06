import { useQuery, gql } from '@apollo/client';
import OrderFragment from '../fragments/OrderFragment';

export const UserOrdersQuery = gql`
  query UserOrder($userId: ID, $queryString: String) {
    user(userId: $userId, queryString: $queryString) {
      orders {
        ...OrderFragment
      }
    }
  }
  ${OrderFragment}
`;

const useUserOrders = ({ userId = null, queryString = '' } = {}) => {
  const { data, loading, error } = useQuery(UserOrdersQuery, {
    skip: !userId,
    variables: { userId, queryString },
  });

  const orders = data?.user?.orders;

  return {
    orders,
    loading,
    error,
  };
};

export default useUserOrders;
