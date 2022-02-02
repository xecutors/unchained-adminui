import { useMutation, gql } from '@apollo/client';

const RemoveProductAssignmentMutation = gql`
  mutation removeProductAssignment(
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
      refetchQueries: ['Products'],
    });
  };

  return {
    removeProductAssignment,
  };
};

export default useRemoveProductAssignment;
