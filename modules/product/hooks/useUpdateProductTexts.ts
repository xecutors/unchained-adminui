import { useMutation, gql } from '@apollo/client';
import {
  IUpdateProductTextsMutation,
  IUpdateProductTextsMutationVariables,
} from '../../../gql/types';
import ProductTextsFragment from '../fragments/ProductTextsFragment';

const UpdateProductTextsMutation = gql`
  mutation UpdateProductTexts($productId: ID!, $texts: [ProductTextInput!]!) {
    updateProductTexts(productId: $productId, texts: $texts) {
      ...ProductTextsFragment
    }
  }
  ${ProductTextsFragment}
`;

const useUpdateProductTexts = () => {
  const [updateProductTextsMutation] = useMutation<
    IUpdateProductTextsMutation,
    IUpdateProductTextsMutationVariables
  >(UpdateProductTextsMutation);

  const updateProductTexts = async ({
    productId,
    texts,
  }: IUpdateProductTextsMutationVariables) => {
    return updateProductTextsMutation({
      variables: { productId, texts },
      refetchQueries: ['Product'],
    });
  };

  return {
    updateProductTexts,
  };
};

export default useUpdateProductTexts;
