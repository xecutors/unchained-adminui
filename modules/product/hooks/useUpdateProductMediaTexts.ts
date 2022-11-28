import { useMutation, gql } from '@apollo/client';
import ProductMediaTextsFragment from '../fragments/ProductMediaTextsFragment';

const UpdateProductMediaTextsMutation = gql`
  mutation UpdateProductMediaTexts(
    $productMediaId: ID!
    $texts: [UpdateProductMediaTextInput!]!
  ) {
    updateProductMediaTexts(productMediaId: $productMediaId, texts: $texts) {
      ...ProductMediaTextsFragment
    }
  }
  ${ProductMediaTextsFragment}
`;

const useUpdateProductMediaTexts = () => {
  const [updateProductMediaTextsMutation] = useMutation(
    UpdateProductMediaTextsMutation,
  );

  const updateProductMediaTexts = async ({ productMediaId, texts }) => {
    return updateProductMediaTextsMutation({
      variables: { productMediaId, texts },
      refetchQueries: ['TranslatedProductMediaTexts'],
    });
  };

  return {
    updateProductMediaTexts,
  };
};

export default useUpdateProductMediaTexts;
