import { useQuery, gql } from '@apollo/client';
import FilterFragment from '../fragments/FilterFragment';

export const FiltersQuery = gql`
  query Filters($limit: Int, $offset: Int, $includeInactive: Boolean) {
    filters(limit: $limit, offset: $offset, includeInactive: $includeInactive) {
      ...FilterFragment
    }
    filtersCount(includeInactive: $includeInactive)
  }
  ${FilterFragment}
`;

const useFilters = ({
  limit = 20,
  offset = 0,
  includeInactive = false,
} = {}) => {
  const { data, loading, error, fetchMore } = useQuery(FiltersQuery, {
    variables: { limit, offset, includeInactive },
  });
  const filters = data?.filters || [];
  const filtersCount = data?.filtersCount;
  const hasMore = filters?.length < filtersCount;
  const loadMore = () => {
    fetchMore({
      variables: { offset: filters.length },
    });
  };

  return {
    filters,
    filtersCount,
    hasMore,
    loading,
    error,
    loadMore,
  };
};

export default useFilters;
