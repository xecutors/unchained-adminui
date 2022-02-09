import { useMutation, gql } from '@apollo/client';

const UpdateFilterMutation = gql`
  mutation UpdateFilter($filter: UpdateFilterInput!, $filterId: ID!) {
    updateFilter(filter: $filter, filterId: $filterId) {
      _id
    }
  }
`;

const useUpdateFilter = () => {
  const [updateFilterMutation] = useMutation(UpdateFilterMutation);

  const updateFilter = async ({ filterId, locale, title, subtitle }) => {
    return updateFilterMutation({
      variables: { filter: { locale, title, subtitle }, filterId },
      refetchQueries: ['Filters'],
    });
  };

  return {
    updateFilter,
  };
};

export default useUpdateFilter;
