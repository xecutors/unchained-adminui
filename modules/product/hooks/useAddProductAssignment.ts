import { useMutation, gql } from '@apollo/client';

const AddProductAssignmentMutation = gql`
  mutation AddProductAssignment(
    $proxyId: ID!
    $productId: ID!
    $vectors: [ProductAssignmentVectorInput!]!
  ) {
    addProductAssignment(
      proxyId: $proxyId
      productId: $productId
      vectors: $vectors
    ) {
      _id
    }
  }
`;

const useAddProductAssignment = () => {
  const [addProductAssignmentMutation] = useMutation(
    AddProductAssignmentMutation,
  );

  const addProductAssignment = async ({ productId, proxyId, vectors }) => {
    return addProductAssignmentMutation({
      variables: { productId, proxyId, vectors },
      refetchQueries: ['Products', 'Product'],
    });
  };

  return {
    addProductAssignment,
  };
};

export default useAddProductAssignment;
