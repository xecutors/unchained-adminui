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
    variables: { orderId },
  });

  return {
    order: data?.order,
    loading,
    error,
  };
};

export default useOrder;
