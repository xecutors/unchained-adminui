import { useMutation, gql } from '@apollo/client';
import {
  IRemoveProductAssignmentMutation,
  IRemoveProductAssignmentMutationVariables,
} from '../../../gql/types';

const RemoveProductAssignmentMutation = gql`
  mutation RemoveProductAssignment(
    $proxyId: ID!
    $vectors: [ProductAssignmentVectorInput!]!
    $productId: ID!
  ) {
    removeProductAssignment(
      proxyId: $proxyId
      productId: $productId
      vectors: $vectors
    ) {
      _id
    }
  }
`;

const useRemoveProductAssignment = () => {
  const [removeProductAssignmentMutation] = useMutation<
    IRemoveProductAssignmentMutation,
    IRemoveProductAssignmentMutationVariables
  >(RemoveProductAssignmentMutation);

  const removeProductAssignment = async ({
    proxyId,
    vectors,
    productId,
  }: IRemoveProductAssignmentMutationVariables) => {
    return removeProductAssignmentMutation({
      variables: { proxyId, vectors, productId },
      refetchQueries: ['ProductAssignments'],
    });
  };

  return {
    removeProductAssignment,
  };
};

export default useRemoveProductAssignment;
