import { useMutation, gql } from '@apollo/client';

const UpdateProductTextsMutation = gql`
  mutation UpdateProductTexts(
    $productId: ID!
    $texts: [UpdateProductTextInput!]!
  ) {
    updateProductTexts(productId: $productId, texts: $texts) {
      _id
    }
  }
`;

const useUpdateProductTexts = () => {
  const [updateProductTextsMutation] = useMutation(UpdateProductTextsMutation);

  const updateProductTexts = async ({ productId, texts }) => {
    return updateProductTextsMutation({
      variables: { productId, texts },
      refetchQueries: ['Products'],
    });
  };

  return {
    updateProductTexts,
  };
};

export default useUpdateProductTexts;
