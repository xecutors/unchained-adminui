import { useQuery, gql } from '@apollo/client';
import OrderDetailFragment from '../fragments/OrderDetailFragment';

export const OrderQuery = gql`
  query Order($orderId: ID!) {
    order(orderId: $orderId) {
      ...OrderDetailFragment
    }
  }
  ${OrderDetailFragment}
`;

const useOrder = ({ orderId = null } = {}) => {
  const { data, loading, error } = useQuery(OrderQuery, {
    skip: !orderId,
    errorPolicy: 'none',
    variables: { orderId },
  });

  return {
    order: data?.order,
    loading,
    error,
  };
};

export const preFetchOrder = async (apolloClient, { orderId = null }) => {
  const { data } = await apolloClient.query({
    query: OrderQuery,
    skip: !orderId,
    variables: { orderId },
  });
  return data?.order;
};

export default useOrder;
