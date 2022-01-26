import { useQuery, gql } from '@apollo/client';

export const FiltersCountQuery = gql`
  query FiltersCount {
    filtersCount
  }
`;

const useFiltersCount = () => {
  const { data, loading, error } = useQuery(FiltersCountQuery);

  const filtersCount = data?.filtersCount;

  return {
    filtersCount,
    loading,
    error,
  };
};

export default useFiltersCount;
