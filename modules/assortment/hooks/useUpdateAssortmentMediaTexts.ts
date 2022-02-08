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

  const updateAssortmentMediaTexts = async ({ assortmentId, texts }) => {
    return updateAssortmentMediaTextsMutation({
      variables: { assortmentId, texts },
      refetchQueries: ['Assortments'],
    });
  };

  return {
    updateAssortmentMediaTexts,
  };
};

export default useUpdateAssortmentMediaTexts;
