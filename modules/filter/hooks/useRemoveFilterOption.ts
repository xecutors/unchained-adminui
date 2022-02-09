import { useMutation, gql } from '@apollo/client';

const RemoveFilterOptionMutation = gql`
  mutation RemoveFilterOption($filterId: ID!, $filterOptionValue: String!) {
    removeFilterOption(
      filterId: $filterId
      filterOptionValue: $filterOptionValue
    ) {
      _id
    }
  }
`;

const useRemoveFilterOption = () => {
  const [removeFilterOptionMutation] = useMutation(RemoveFilterOptionMutation);

  const removeFilterOption = async ({ filterId, filterOptionValue }) => {
    return removeFilterOptionMutation({
      variables: { filterOptionValue, filterId },
      refetchQueries: ['Filters'],
    });
  };

  return {
    removeFilterOption,
  };
};

export default useRemoveFilterOption;
