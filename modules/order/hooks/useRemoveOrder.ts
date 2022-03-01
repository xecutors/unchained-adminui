import { useMutation, gql } from '@apollo/client';

const RemoveOrderMutation = gql`
  mutation RemoveOrder($orderId: ID!) {
    removeOrder(orderId: $orderId) {
      _id
    }
  }
`;

const useRemoveOrder = () => {
  const [removeOrderMutation] = useMutation(RemoveOrderMutation);

  const removeOrder = async ({ orderId }: { orderId: string }) => {
    return removeOrderMutation({
      variables: {
        orderId,
      },
      refetchQueries: ['Order'],
    });
  };

  return {
    removeOrder,
  };
};

export default useRemoveOrder;
