import { useMutation, gql } from '@apollo/client';
import {
  IUpdateAssortmentTextsMutation,
  IUpdateAssortmentTextsMutationVariables,
} from '../../../gql/types';
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
  const [updateAssortmentTextsMutation] = useMutation<
    IUpdateAssortmentTextsMutation,
    IUpdateAssortmentTextsMutationVariables
  >(UpdateAssortmentTextsMutation);

  const updateAssortmentTexts = async ({
    assortmentId,
    texts,
  }: IUpdateAssortmentTextsMutationVariables) => {
    return updateAssortmentTextsMutation({
      variables: { assortmentId, texts },
    });
  };

  return {
    updateAssortmentTexts,
  };
};

export default useUpdateAssortmentTexts;
