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
      texts(forceLocale: $forceLocale) {
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
  const { locale } = useIntl();

  const { data, loading, error } = useQuery(FiltersQuery, {
    variables: {
      queryString,
      limit,
      offset,
      includeInactive,
      forceLocale: forceLocale || locale,
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
