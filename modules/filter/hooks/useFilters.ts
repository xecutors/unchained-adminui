import { useQuery, gql } from '@apollo/client';
import FilterFragment from '../fragments/FilterFragment';

export const FiltersQuery = gql`
  query Filters(
    $queryString: String
    $limit: Int
    $offset: Int
    $includeInactive: Boolean
    $sort: [SortOptionInput!]
  ) {
    filters(
      queryString: $queryString
      limit: $limit
      offset: $offset
      includeInactive: $includeInactive
      sort: $sort
    ) {
      ...FilterFragment
      texts {
        _id
        title
        subtitle
        locale
      }
    }
    filtersCount(includeInactive: $includeInactive, queryString: $queryString)
  }
  ${FilterFragment}
`;

const useFilters = ({
  queryString = '',
  limit = 20,
  offset = 0,
  includeInactive = true,
  sort = [],
  forceLocale = '',
} = {}) => {
  const { data, loading, error } = useQuery(FiltersQuery, {
    context: {
      headers: {
        forceLocale,
      },
    },
    variables: {
      queryString,
      limit,
      offset,
      includeInactive,
      sort,
    },
  });
  const filters = data?.filters || [];
  const filtersCount = data?.filtersCount;
  const hasMore = filters?.length < filtersCount;
  return {
    filters,
    filtersCount,
    hasMore,
    loading,
    error,
  };
};

export default useFilters;
