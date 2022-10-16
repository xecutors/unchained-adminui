import { useMutation, gql } from '@apollo/client';

const UpdateProductTokenizationMutation = gql`
  mutation UpdateProductTokenization(
    $productId: ID!
    $tokenization: UpdateProductTokenizationInput!
  ) {
    updateProductTokenization(
      productId: $productId
      tokenization: $tokenization
    ) {
      _id
    }
  }
`;

const useUpdateProductTokenization = () => {
  const [updateProductTokenizationMutation] = useMutation(
    UpdateProductTokenizationMutation,
  );

  const updateProductTokenization = async ({
    productId,
    contractAddress,
    contractStandard,
    tokenId,
    supply,
  }) => {
    return updateProductTokenizationMutation({
      variables: {
        productId,
        tokenization: {
          contractAddress,
          contractStandard,
          tokenId,
          supply: parseInt(supply, 10),
        },
      },
      refetchQueries: ['Product', 'Products'],
    });
  };

  return {
    updateProductTokenization,
  };
};

export default useUpdateProductTokenization;
