import { useQuery, gql } from '@apollo/client';
import {
  IOrdersQuery,
  IOrdersQueryVariables,
  ISortOptionInput,
} from '../../../gql/types';
import { DefaultLimit } from '../../common/data/miscellaneous';
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
  limit = DefaultLimit,
  offset = 0,
  includeCarts = false,
  queryString = '',
  sort: sortOptions = [],
}: IOrdersQueryVariables = {}) => {
  const { data, loading, error } = useQuery<
    IOrdersQuery,
    IOrdersQueryVariables
  >(OrdersQuery, {
    variables: {
      limit,
      offset,
      includeCarts,
      queryString,
      sort: sortOptions.length
        ? sortOptions
        : ([{ key: 'ordered', value: 'DESC' }] as ISortOptionInput[]),
    },
  });
  const orders = data?.orders || [];
  const ordersCount = data?.ordersCount;
  const hasMore = orders?.length < ordersCount;

  return {
    orders,
    ordersCount,
    hasMore,
    loading,
    error,
  };
};

export default useOrders;
