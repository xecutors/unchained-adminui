import { useMutation, gql } from '@apollo/client';
import AssortmentTextsFragment from '../fragments/AssortmentTextsFragment';

const UpdateAssortmentTextsMutation = gql`
  mutation updateAssortmentTexts(
    $assortmentId: ID!
    $texts: [UpdateAssortmentTextInput!]!
  ) {
    updateAssortmentTexts(assortmentId: $assortmentId, texts: $texts) {
      ...AssortmentTextsFragment
    }
  }
  ${AssortmentTextsFragment}
`;

const useUpdateAssortmentTexts = () => {
  const [updateAssortmentTextsMutation] = useMutation(
    UpdateAssortmentTextsMutation,
  );

  const updateAssortmentTexts = async ({ assortmentId, texts }) => {
    return updateAssortmentTextsMutation({
      variables: { assortmentId, texts },
    });
  };

  return {
    updateAssortmentTexts,
  };
};

export default useUpdateAssortmentTexts;
