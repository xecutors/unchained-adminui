import { useMutation, gql } from '@apollo/client';
import {
  IRejectOrderMutation,
  IRejectOrderMutationVariables,
} from '../../../gql/types';

const RejectOrderMutation = gql`
  mutation RejectOrder($orderId: ID!) {
    rejectOrder(orderId: $orderId) {
      _id
    }
  }
`;

const useRejectOrder = () => {
  const [rejectOrderMutation] = useMutation<
    IRejectOrderMutation,
    IRejectOrderMutationVariables
  >(RejectOrderMutation);

  const rejectOrder = async ({ orderId }: IRejectOrderMutationVariables) => {
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
