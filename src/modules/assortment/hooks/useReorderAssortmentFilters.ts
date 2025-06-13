import { useMutation, gql } from '@apollo/client';
import {
  IReorderAssortmentFiltersMutation,
  IReorderAssortmentFiltersMutationVariables,
} from '../../../gql/types';

const ReorderAssortmentFiltersMutation = gql`
  mutation ReorderAssortmentFilters(
    $sortKeys: [ReorderAssortmentFilterInput!]!
  ) {
    reorderAssortmentFilters(sortKeys: $sortKeys) {
      _id
      sortKey
    }
  }
`;

const useReorderAssortmentFilters = () => {
  const [reorderAssortmentFiltersMutation] = useMutation<
    IReorderAssortmentFiltersMutation,
    IReorderAssortmentFiltersMutationVariables
  >(ReorderAssortmentFiltersMutation);

  const reorderAssortmentFilters = async ({
    sortKeys,
  }: IReorderAssortmentFiltersMutationVariables) => {
    return reorderAssortmentFiltersMutation({
      variables: { sortKeys },
      refetchQueries: ['AssortmentFilters'],
    });
  };

  return {
    reorderAssortmentFilters,
  };
};

export default useReorderAssortmentFilters;
