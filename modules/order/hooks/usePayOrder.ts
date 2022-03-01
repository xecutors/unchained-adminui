import { useMutation, gql } from '@apollo/client';

const PayOrderMutation = gql`
  mutation PayOrder($orderId: ID!) {
    payOrder(orderId: $orderId) {
      _id
    }
  }
`;

const usePayOrder = () => {
  const [payOrderMutation] = useMutation(PayOrderMutation);

  const payOrder = async ({ orderId }: { orderId: string }) => {
    return payOrderMutation({
      variables: {
        orderId,
      },
      refetchQueries: ['Order'],
    });
  };

  return {
    payOrder,
  };
};

export default usePayOrder;
