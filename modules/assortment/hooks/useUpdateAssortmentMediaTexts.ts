import { useMutation, gql } from '@apollo/client';
import {
  IUpdateAssortmentMediaTextsMutation,
  IUpdateAssortmentMediaTextsMutationVariables,
} from '../../../gql/types';
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
  const [updateAssortmentMediaTextsMutation] = useMutation<
    IUpdateAssortmentMediaTextsMutation,
    IUpdateAssortmentMediaTextsMutationVariables
  >(UpdateAssortmentMediaTextsMutation);

  const updateAssortmentMediaTexts = async ({
    assortmentMediaId,
    texts,
  }: IUpdateAssortmentMediaTextsMutationVariables) => {
    return updateAssortmentMediaTextsMutation({
      variables: { assortmentMediaId, texts },
    });
  };

  return {
    updateAssortmentMediaTexts,
  };
};

export default useUpdateAssortmentMediaTexts;
