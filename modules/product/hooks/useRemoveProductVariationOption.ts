import { useMutation, gql } from '@apollo/client';

const RemoveProductVariationOptionMutation = gql`
  mutation removeProductVariationOption(
    $productVariationId: ID!
    $productVariationOptionValue: String!
  ) {
    removeProductVariationOption(
      productVariationId: $productVariationId
      productVariationOptionValue: $productVariationOptionValue
    ) {
      _id
    }
  }
`;

const useRemoveProductVariationOption = () => {
  const [removeProductVariationOptionMutation] = useMutation(
    RemoveProductVariationOptionMutation,
  );

  const removeProductVariationOption = async ({
    productVariationId,
    productVariationOptionValue,
  }) => {
    return removeProductVariationOptionMutation({
      variables: { productVariationId, productVariationOptionValue },
      refetchQueries: ['ProductVariations'],
    });
  };

  return {
    removeProductVariationOption,
  };
};

export default useRemoveProductVariationOption;
