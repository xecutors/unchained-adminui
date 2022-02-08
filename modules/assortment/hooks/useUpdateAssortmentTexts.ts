import { useMutation, gql } from '@apollo/client';

const UpdateAssortmentTextsMutation = gql`
  mutation updateAssortmentTexts(
    $assortmentId: ID!
    $texts: [UpdateAssortmentTextInput!]!
  ) {
    updateAssortmentTexts(assortmentId: $assortmentId, texts: $texts) {
      _id
    }
  }
`;

const useUpdateAssortmentTexts = () => {
  const [updateAssortmentTextsMutation] = useMutation(
    UpdateAssortmentTextsMutation,
  );

  const updateAssortmentTexts = async ({ assortmentId, texts }) => {
    return updateAssortmentTextsMutation({
      variables: { assortmentId, texts },
      refetchQueries: ['Assortments'],
    });
  };

  return {
    updateAssortmentTexts,
  };
};

export default useUpdateAssortmentTexts;
