import { useMutation, gql } from '@apollo/client';

const RemoveAssortmentFilterMutation = gql`
  mutation RemoveAssortmentFilter($assortmentFilterId: ID!) {
    removeAssortmentFilter(assortmentFilterId: $assortmentFilterId) {
      _id
    }
  }
`;

const useRemoveAssortmentFilter = () => {
  const [removeAssortmentFilterMutation] = useMutation(
    RemoveAssortmentFilterMutation,
  );

  const removeAssortmentFilter = async ({ assortmentFilterId }) => {
    return removeAssortmentFilterMutation({
      variables: { assortmentFilterId },
      refetchQueries: ['Assortments'],
    });
  };

  return {
    removeAssortmentFilter,
  };
};

export default useRemoveAssortmentFilter;
