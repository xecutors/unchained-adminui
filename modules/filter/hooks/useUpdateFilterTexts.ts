import { useMutation, gql } from '@apollo/client';

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
      _id
    }
  }
`;

const useUpdateFilterTexts = () => {
  const [updateFilterTextsMutation] = useMutation(UpdateFilterTextsMutation);

  const updateFilterTexts = async ({ filterId, filterOptionValue, texts }) => {
    return updateFilterTextsMutation({
      variables: { filterOptionValue, filterId, texts },
      refetchQueries: ['Filters', 'Filter', 'TranslatedFilterTexts'],
    });
  };

  return {
    updateFilterTexts,
  };
};

export default useUpdateFilterTexts;
