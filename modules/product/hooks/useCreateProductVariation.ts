import { useMutation, gql } from '@apollo/client';

const CreateProductVariationMutation = gql`
  mutation CreateProductVariation(
    $productId: ID!
    $variation: CreateProductVariationInput!
  ) {
    createProductVariation(productId: $productId, variation: $variation) {
      _id
    }
  }
`;

const useCreateProductVariation = () => {
  const [createProductVariationMutation] = useMutation(
    CreateProductVariationMutation,
  );

  const createProductVariation = async ({ productId, key, type, title }) => {
    return createProductVariationMutation({
      variables: { productId, variation: { key, type, title } },
      refetchQueries: ['ProductVariations', 'Product'],
    });
  };

  return {
    createProductVariation,
  };
};

export default useCreateProductVariation;
