import { useMutation, gql } from '@apollo/client';
import AssortmentMediaTextsFragment from '../fragments/AssortmentMediaTextsFragment';

const UpdateAssortmentMediaTextsMutation = gql`
  mutation UpdateAssortmentMediaTexts(
    $assortmentMediaId: ID!
    $texts: [UpdateAssortmentMediaTextInput!]!
  ) {
    updateAssortmentMediaTexts(
      assortmentMediaId: $assortmentMediaId
      texts: $texts
    ) {
      ...AssortmentMediaTextsFragment
    }
  }
  ${AssortmentMediaTextsFragment}
`;

const useUpdateAssortmentMediaTexts = () => {
  const [updateAssortmentMediaTextsMutation] = useMutation(
    UpdateAssortmentMediaTextsMutation,
  );

  const updateAssortmentMediaTexts = async ({ assortmentMediaId, texts }) => {
    return updateAssortmentMediaTextsMutation({
      variables: { assortmentMediaId, texts },
    });
  };

  return {
    updateAssortmentMediaTexts,
  };
};

export default useUpdateAssortmentMediaTexts;
