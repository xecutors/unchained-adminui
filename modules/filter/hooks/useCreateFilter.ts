import { useMutation, gql } from '@apollo/client';
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
  const [createFilterMutation, { data, loading, error }] =
    useMutation(CreateFilterMutation);

  const createFilter = async ({ key, type, title, options }) => {
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
