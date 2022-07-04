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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    $sort: [SortOptionInput!]
=======
>>>>>>> 89c5330a (force localiziation)
=======
    $Sort: [SortOptionInput!]
>>>>>>> f382ae7f (Add multiple sort option.)
=======
    $sort: [SortOptionInput!]
>>>>>>> 67cf36a8 (Add sort)
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
    filtersCount(includeInactive: $includeInactive)
  }
  ${FilterFragment}
`;

const useFilters = ({
  queryString = '',
  limit = 20,
  offset = 0,
  includeInactive = false,
  sort = [],
} = {}) => {
  const { locale } = useIntl();

  const { data, loading, error, fetchMore } = useQuery(FiltersQuery, {
    variables: {
      queryString,
      limit,
      offset,
      includeInactive,
      forceLocale: locale,
      sort,
    },
  });
  const filters = data?.filters || [];
  const filtersCount = data?.filtersCount;
  const hasMore = filters?.length < filtersCount;
  const loadMore = () => {
    fetchMore({
      variables: { offset: filters.length, sort },
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
