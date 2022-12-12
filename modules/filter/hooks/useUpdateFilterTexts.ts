import { useMutation, gql } from '@apollo/client';
import FilterTextsFragment from '../fragments/FilterTextsFragment';

const UpdateFilterTextsMutation = gql`
  mutation UpdateFilterTexts(
    $filterId: ID!
    $filterOptionValue: String
    $texts: [UpdateFilterTextInput!]!
  ) {
    updateFilterTexts(
      filterId: $filterId
      filterOptionValue: $filterOptionValue
      texts: $texts
    ) {
      ...FilterTextsFragment
    }
  }
  ${FilterTextsFragment}
`;

const useUpdateFilterTexts = () => {
  const [updateFilterTextsMutation] = useMutation(UpdateFilterTextsMutation);

  const updateFilterTexts = async ({ filterId, filterOptionValue, texts }) => {
    return updateFilterTextsMutation({
      variables: { filterOptionValue, filterId, texts },
      refetchQueries: ['TranslatedFilterTexts'],
    });
  };

  return {
    updateFilterTexts,
  };
};

export default useUpdateFilterTexts;
