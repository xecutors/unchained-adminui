import { useMutation, gql } from '@apollo/client';

const UpdateProductVariationTextsMutation = gql`
  mutation UpdateProductVariationTexts(
    $productVariationId: ID!
    $productVariationOptionValue: String
    $texts: [UpdateProductVariationTextInput!]!
  ) {
    updateProductVariationTexts(
      productVariationId: $productVariationId
      productVariationOptionValue: $productVariationOptionValue
      texts: $texts
    ) {
      _id
    }
  }
`;

const useUpdateProductVariationTexts = () => {
  const [updateProductVariationTextsMutation] = useMutation(
    UpdateProductVariationTextsMutation,
  );

  const updateProductVariationTexts = async ({
    productVariationId,
    productVariationOptionValue,
    texts,
  }) => {
    return updateProductVariationTextsMutation({
      variables: { productVariationId, productVariationOptionValue, texts },
      refetchQueries: ['Products'],
    });
  };

  return {
    updateProductVariationTexts,
  };
};

export default useUpdateProductVariationTexts;
