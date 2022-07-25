import { useMutation, gql } from '@apollo/client';

const RemoveProductAssignmentMutation = gql`
  mutation RemoveProductAssignment(
    $proxyId: ID!
    $vectors: [ProductAssignmentVectorInput!]!
  ) {
    removeProductAssignment(proxyId: $proxyId, vectors: $vectors) {
      _id
    }
  }
`;

const useRemoveProductAssignment = () => {
  const [removeProductAssignmentMutation] = useMutation(
    RemoveProductAssignmentMutation,
  );

  const removeProductAssignment = async ({ proxyId, vectors }) => {
    return removeProductAssignmentMutation({
      variables: { proxyId, vectors },
      refetchQueries: ['ProductAssignments'],
    });
  };

  return {
    removeProductAssignment,
  };
};

export default useRemoveProductAssignment;
