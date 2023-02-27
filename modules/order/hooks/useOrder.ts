import { useQuery, gql } from '@apollo/client';
import useUnchainedContext from '../../UnchainedContext/useUnchainedContext';
import OrderDetailFragment from '../fragments/OrderDetailFragment';

export const GetOrderQuery = (inlineFragment = '') => gql`
  query Order($orderId: ID!) {
    order(orderId: $orderId) {
      ...OrderDetailFragment
      ${inlineFragment}
    }
  }
  ${OrderDetailFragment}
`;

const useOrder = ({ orderId = null } = {}) => {
  const { customProperties } = useUnchainedContext();
  const { data, loading, error } = useQuery(
    GetOrderQuery(customProperties?.Order),
    {
      skip: !orderId,

      variables: { orderId },
    },
  );

  return {
    order: data?.order,
    loading,
    error,
  };
};

export default useOrder;
