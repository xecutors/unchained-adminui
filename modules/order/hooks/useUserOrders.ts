import { useQuery, gql } from '@apollo/client';
import {
  ISortOptionInput,
  IUserOrderQuery,
  IUserOrderQueryVariables,
} from '../../../gql/types';
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
}: IUserOrderQueryVariables = {}) => {
  const { data, loading, error } = useQuery<
    IUserOrderQuery,
    IUserOrderQueryVariables
  >(UserOrdersQuery, {
    skip: !userId,
    variables: {
      userId,
      queryString,
      sort: sortOptions.length
        ? sortOptions
        : ([{ key: 'ordered', value: 'DESC' }] as ISortOptionInput[]),
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
