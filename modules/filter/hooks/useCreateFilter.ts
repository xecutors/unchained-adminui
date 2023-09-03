import { useMutation, gql } from '@apollo/client';
import {
  ICreateFilterMutation,
  ICreateFilterMutationVariables,
} from '../../../gql/types';
import FilterFragment from '../fragments/FilterFragment';

const CreateFilterMutation = gql`
  mutation CreateFilter($filter: CreateFilterInput!) {
    createFilter(filter: $filter) {
      ...FilterFragment
    }
  }
  ${FilterFragment}
`;

const useCreateFilter = () => {
  const [createFilterMutation, { data, loading, error }] = useMutation<
    ICreateFilterMutation,
    ICreateFilterMutationVariables
  >(CreateFilterMutation);

  const createFilter = async ({
    filter: { key, type, title, options },
  }: ICreateFilterMutationVariables) => {
    return createFilterMutation({
      variables: { filter: { key, title, type, options } },
    });
  };
  const newFilter = data?.createFilter;
  return {
    createFilter,
    newFilter,
    loading,
    error,
  };
};

export default useCreateFilter;
