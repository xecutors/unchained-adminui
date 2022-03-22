import { useQuery, gql } from '@apollo/client';
import CountryFragment from '../fragments/CountryFragment';

export const CountriesQuery = gql`
  query Countries($limit: Int, $offset: Int, $includeInactive: Boolean) {
    countries(
      limit: $limit
      offset: $offset
      includeInactive: $includeInactive
    ) {
      ...CountryFragment
    }
    countriesCount(includeInactive: $includeInactive)
  }

  ${CountryFragment}
`;

const useCountries = ({
  limit = 20,
  offset = 0,
  includeInactive = false,
} = {}) => {
  const { data, loading, error, fetchMore }: any = useQuery(CountriesQuery, {
    variables: { limit, offset, includeInactive },
  });

  const countries = data?.countries || [];
  const countriesCount = data?.countriesCount;
  const hasMore = countries?.length < countriesCount;

  const loadMore = () =>
    fetchMore({
      variables: { offset: countries.length },
    });

  return {
    countries,
    countriesCount,
    hasMore,
    loading,
    error,
    loadMore,
  };
};

export default useCountries;
