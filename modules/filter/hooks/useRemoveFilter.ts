import { useMutation, gql } from '@apollo/client';

const RemoveFilterMutation = gql`
  mutation RemoveFilter($filterId: ID!) {
    removeFilter(filterId: $filterId) {
      _id
    }
  }
`;

const useRemoveFilter = () => {
  const [removeFilterMutation] = useMutation(RemoveFilterMutation);

  const removeFilter = async ({ filterId }) => {
    return removeFilterMutation({
      variables: { filterId },
      refetchQueries: ['Filters'],
    });
  };

  return {
    removeFilter,
  };
};

export default useRemoveFilter;
