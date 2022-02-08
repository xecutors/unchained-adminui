import { useMutation, gql } from '@apollo/client';

const ReorderAssortmentFiltersMutation = gql`
  mutation ReorderAssortmentFilters(
    $sortKeys: [ReorderAssortmentFilterInput!]!
  ) {
    reorderAssortmentFilters(sortKeys: $sortKeys) {
      _id
    }
  }
`;

const useReorderAssortmentFilters = () => {
  const [reorderAssortmentFiltersMutation] = useMutation(
    ReorderAssortmentFiltersMutation,
  );

  const reorderAssortmentFilters = async ({ sortKeys }) => {
    return reorderAssortmentFiltersMutation({
      variables: { sortKeys },
      refetchQueries: ['Assortments'],
    });
  };

  return {
    reorderAssortmentFilters,
  };
};

export default useReorderAssortmentFilters;
