import { useMutation, gql } from '@apollo/client';
import {
  IRemoveAssortmentFilterMutation,
  IRemoveAssortmentFilterMutationVariables,
} from '../../../gql/types';

const RemoveAssortmentFilterMutation = gql`
  mutation RemoveAssortmentFilter($assortmentFilterId: ID!) {
    removeAssortmentFilter(assortmentFilterId: $assortmentFilterId) {
      _id
    }
  }
`;

const useRemoveAssortmentFilter = () => {
  const [removeAssortmentFilterMutation] = useMutation<
    IRemoveAssortmentFilterMutation,
    IRemoveAssortmentFilterMutationVariables
  >(RemoveAssortmentFilterMutation);

  const removeAssortmentFilter = async ({
    assortmentFilterId,
  }: IRemoveAssortmentFilterMutationVariables) => {
    return removeAssortmentFilterMutation({
      variables: { assortmentFilterId },
      refetchQueries: ['AssortmentFilters'],
    });
  };

  return {
    removeAssortmentFilter,
  };
};

export default useRemoveAssortmentFilter;
