import { useMutation, gql } from '@apollo/client';

const ConfirmOrderMutation = gql`
  mutation ConfirmOrder($orderId: ID!) {
    confirmOrder(orderId: $orderId) {
      _id
    }
  }
`;

const useConfirmOrder = () => {
  const [confirmOrderMutation] = useMutation(ConfirmOrderMutation);

  const confirmOrder = async ({ orderId }: { orderId: string }) => {
    return confirmOrderMutation({
      variables: {
        orderId,
      },
      refetchQueries: ['Order'],
    });
  };

  return {
    confirmOrder,
  };
};

export default useConfirmOrder;
