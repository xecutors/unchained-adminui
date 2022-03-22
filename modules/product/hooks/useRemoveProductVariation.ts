import { useMutation, gql } from '@apollo/client';

const RemoveProductVariationMutation = gql`
  mutation RemoveProductVariation($productVariationId: ID!) {
    removeProductVariation(productVariationId: $productVariationId) {
      _id
    }
  }
`;

const useRemoveProductVariation = () => {
  const [removeProductVariationMutation] = useMutation(
    RemoveProductVariationMutation,
  );

  const removeProductVariation = async ({ productVariationId }) => {
    return removeProductVariationMutation({
      variables: { productVariationId },
      refetchQueries: ['ProductVariations'],
    });
  };

  return {
    removeProductVariation,
  };
};

export default useRemoveProductVariation;
