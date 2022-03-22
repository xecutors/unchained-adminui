import { useMutation, gql } from '@apollo/client';

const CreateProductVariationOptionMutation = gql`
  mutation CreateProductVariationOption(
    $productVariationId: ID!
    $option: CreateProductVariationOptionInput!
  ) {
    createProductVariationOption(
      productVariationId: $productVariationId
      option: $option
    ) {
      _id
    }
  }
`;

const useCreateProductVariationOption = () => {
  const [createProductVariationOptionMutation] = useMutation(
    CreateProductVariationOptionMutation,
  );

  const createProductVariationOption = async ({
    productVariationId,
    value,
    title,
  }) => {
    return createProductVariationOptionMutation({
      variables: { productVariationId, option: { value, title } },
      refetchQueries: ['ProductVariations', 'Product'],
    });
  };

  return {
    createProductVariationOption,
  };
};

export default useCreateProductVariationOption;
