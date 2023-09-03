import { useMutation, gql } from '@apollo/client';
import {
  ICreateProductVariationOptionMutation,
  ICreateProductVariationOptionMutationVariables,
} from '../../../gql/types';

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
  const [createProductVariationOptionMutation] = useMutation<
    ICreateProductVariationOptionMutation,
    ICreateProductVariationOptionMutationVariables
  >(CreateProductVariationOptionMutation);

  const createProductVariationOption = async ({
    productVariationId,
    option: { value, title },
  }: ICreateProductVariationOptionMutationVariables) => {
    return createProductVariationOptionMutation({
      variables: { productVariationId, option: { value, title } },
      refetchQueries: ['ProductVariations'],
    });
  };

  return {
    createProductVariationOption,
  };
};

export default useCreateProductVariationOption;
