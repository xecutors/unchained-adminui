import { useQuery, gql } from '@apollo/client';
import OrderFragment from '../fragments/OrderFragment';

export const UserOrdersQuery = gql`
  query UserOrder(
    $userId: ID
    $queryString: String
    $sort: [SortOptionInput!]
  ) {
    user(userId: $userId) {
      orders(queryString: $queryString, sort: $sort) {
        ...OrderFragment
      }
    }
  }
  ${OrderFragment}
`;

const useUserOrders = ({
  userId = null,
  queryString = '',
  sort: sortOptions = [],
} = {}) => {
  const { data, loading, error } = useQuery(UserOrdersQuery, {
    skip: !userId,
    variables: {
      userId,
      queryString,
      sort: sortOptions.length
        ? sortOptions
        : [{ key: 'ordered', value: 'DESC' }],
    },
  });

  const orders = data?.user?.orders;

  return {
    orders,
    loading,
    error,
  };
};

export default useUserOrders;
