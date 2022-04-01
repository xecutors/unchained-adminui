import { useMutation, gql } from '@apollo/client';

const RejectOrderMutation = gql`
  mutation RejectOrder($orderId: ID!) {
    rejectOrder(orderId: $orderId) {
      _id
    }
  }
`;

const useRejectOrder = () => {
  const [rejectOrderMutation] = useMutation(RejectOrderMutation);

  const rejectOrder = async ({ orderId }: { orderId: string }) => {
    return rejectOrderMutation({
      variables: {
        orderId,
      },
      refetchQueries: ['Order'],
    });
  };

  return {
    rejectOrder,
  };
};

export default useRejectOrder;
