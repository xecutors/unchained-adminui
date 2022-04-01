import { useMutation, gql } from '@apollo/client';

const CreateFilterMutation = gql`
  mutation CreateFilter($filter: CreateFilterInput!) {
    createFilter(filter: $filter) {
      _id
    }
  }
`;

const useCreateFilter = () => {
  const [createFilterMutation, { data, loading, error }] =
    useMutation(CreateFilterMutation);

  const createFilter = async ({ key, type, title, options }) => {
    return createFilterMutation({
      variables: { filter: { key, title, type, options } },
      refetchQueries: ['Filters'],
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
