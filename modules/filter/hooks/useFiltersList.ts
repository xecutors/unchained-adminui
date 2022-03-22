import { useQuery, gql } from '@apollo/client';

export const FiltersListQuery = gql`
  query FiltersList($limit: Int, $offset: Int, $includeInactive: Boolean) {
    filters(limit: $limit, offset: $offset, includeInactive: $includeInactive) {
      _id
      key
      isActive
      texts {
        _id
        title
        subtitle
      }
      type
    }
  }
`;

const useFiltersList = ({
  limit = 20,
  offset = 0,
  includeInactive = false,
} = {}) => {
  const { data, loading, error } = useQuery(FiltersListQuery, {
    variables: { limit, offset, includeInactive },
  });
  const filters = data?.filters || [];

  return {
    filters,
    loading,
    error,
  };
};

export default useFiltersList;
