import { useMutation, gql } from '@apollo/client';

const DeliverOrderMutation = gql`
  mutation DeliverOrder($orderId: ID!) {
    deliverOrder(orderId: $orderId) {
      _id
    }
  }
`;

const useDeliverOrder = () => {
  const [deliverOrderMutation] = useMutation(DeliverOrderMutation);

  const deliverOrder = async ({ orderId }: { orderId: string }) => {
    return deliverOrderMutation({
      variables: {
        orderId,
      },
      refetchQueries: ['Order'],
    });
  };

  return {
    deliverOrder,
  };
};

export default useDeliverOrder;
