import { useQuery, gql } from '@apollo/client';

const FiltersCountQuery = gql`
  query FiltersCount($queryString: String, $includeInactive: Boolean) {
    filtersCount(includeInactive: $includeInactive, queryString: $queryString)
  }
`;

const useFiltersCount = ({ queryString = '', includeInactive = true } = {}) => {
  const { data, loading, error } = useQuery(FiltersCountQuery, {
    variables: {
      queryString,
      includeInactive,
    },
  });

  const filtersCount = data?.filtersCount;

  return {
    filtersCount,
    loading,
    error,
  };
};

export default useFiltersCount;
