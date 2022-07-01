import { useQuery, gql } from '@apollo/client';
import { useIntl } from 'react-intl';
import FilterFragment from '../fragments/FilterFragment';

export const FiltersQuery = gql`
  query Filters(
    $queryString: String
    $limit: Int
    $offset: Int
    $includeInactive: Boolean
    $forceLocale: String
  ) {
    filters(
      queryString: $queryString
      limit: $limit
      offset: $offset
      includeInactive: $includeInactive
    ) {
      ...FilterFragment
    }
    filtersCount(includeInactive: $includeInactive)
  }
  ${FilterFragment}
`;

const useFilters = ({
  queryString = '',
  limit = 20,
  offset = 0,
  includeInactive = false,
} = {}) => {
  const { locale } = useIntl();

  const { data, loading, error, fetchMore } = useQuery(FiltersQuery, {
    variables: {
      queryString,
      limit,
      offset,
      includeInactive,
      forceLocale: locale,
    },
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
