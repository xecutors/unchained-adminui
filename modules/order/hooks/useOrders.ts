import { useQuery, gql } from '@apollo/client';
import OrderFragment from '../fragments/OrderFragment';

export const OrdersQuery = gql`
  query Orders(
    $limit: Int
    $offset: Int
    $includeCarts: Boolean
    $queryString: String
    $sort: [SortOptionInput!]
  ) {
    orders(
      limit: $limit
      offset: $offset
      includeCarts: $includeCarts
      queryString: $queryString
      sort: $sort
    ) {
      ...OrderFragment
    }
    ordersCount
  }
  ${OrderFragment}
`;

const useOrders = ({
  limit = 20,
  offset = 0,
  includeCarts = false,
  queryString = '',
  sort = [],
} = {}) => {
  const { data, loading, error, fetchMore } = useQuery(OrdersQuery, {
    variables: { limit, offset, includeCarts, queryString, sort },
  });
  const orders = data?.orders || [];
  const ordersCount = data?.ordersCount;
  const hasMore = orders?.length < ordersCount;
  const loadMore = () => {
    fetchMore({
      variables: { offset: orders.length },
    });
  };

  return {
    orders,
    ordersCount,
    hasMore,
    loading,
    error,
    loadMore,
  };
};

export default useOrders;
