import { useMutation, gql } from '@apollo/client';

const CreateFilterMutation = gql`
  mutation CreateFilter($filter: CreateFilterInput!) {
    createFilter(filter: $filter) {
      _id
    }
  }
`;

const useCreateFilter = () => {
  const [createFilterMutation] = useMutation(CreateFilterMutation);

  const createFilter = async ({ key, type, title, options }) => {
    return createFilterMutation({
      variables: { filter: { key, title, type, options } },
      refetchQueries: ['Filters'],
    });
  };

  return {
    createFilter,
  };
};

export default useCreateFilter;
