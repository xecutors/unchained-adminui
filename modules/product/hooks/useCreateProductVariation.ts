import { useMutation, gql } from '@apollo/client';
import {
  ICreateProductVariationMutation,
  ICreateProductVariationMutationVariables,
} from '../../../gql/types';

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
  const [createProductVariationMutation] = useMutation<
    ICreateProductVariationMutation,
    ICreateProductVariationMutationVariables
  >(CreateProductVariationMutation);

  const createProductVariation = async ({
    productId,
    variation: { key, type, title },
  }: ICreateProductVariationMutationVariables) => {
    return createProductVariationMutation({
      variables: { productId, variation: { key, type, title } },
      refetchQueries: ['ProductVariations'],
    });
  };

  return {
    createProductVariation,
  };
};

export default useCreateProductVariation;
