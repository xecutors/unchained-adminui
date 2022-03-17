import { useMutation, gql } from '@apollo/client';

const UpdateAssortmentMediaTextsMutation = gql`
  mutation UpdateAssortmentMediaTexts(
    $assortmentMediaId: ID!
    $texts: [UpdateAssortmentMediaTextInput!]!
  ) {
    updateAssortmentMediaTexts(
      assortmentMediaId: $assortmentMediaId
      texts: $texts
    ) {
      _id
    }
  }
`;

const useUpdateAssortmentMediaTexts = () => {
  const [updateAssortmentMediaTextsMutation] = useMutation(
    UpdateAssortmentMediaTextsMutation,
  );

  const updateAssortmentMediaTexts = async ({ assortmentMediaId, texts }) => {
    return updateAssortmentMediaTextsMutation({
      variables: { assortmentMediaId, texts },
      refetchQueries: ['TranslatedAssortmentMediaTexts'],
    });
  };

  return {
    updateAssortmentMediaTexts,
  };
};

export default useUpdateAssortmentMediaTexts;
