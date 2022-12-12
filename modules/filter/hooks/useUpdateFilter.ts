import { useMutation, gql } from '@apollo/client';
import FilterFragment from '../fragments/FilterFragment';

const UpdateFilterMutation = gql`
  mutation UpdateFilter($filter: UpdateFilterInput!, $filterId: ID!) {
    updateFilter(filter: $filter, filterId: $filterId) {
      ...FilterFragment
    }
  }
  ${FilterFragment}
`;

const useUpdateFilter = () => {
  const [updateFilterMutation] = useMutation(UpdateFilterMutation);

  const updateFilter = async ({ filterId, isActive, key }) => {
    return updateFilterMutation({
      variables: { filter: { isActive, key }, filterId },
    });
  };

  return {
    updateFilter,
  };
};

export default useUpdateFilter;
