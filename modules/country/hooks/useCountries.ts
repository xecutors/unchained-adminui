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
  }
  ${CountryFragment}
`;

const useCountries = ({
  limit = 20,
  offset = 0,
  includeInactive = true,
} = {}) => {
  const { data, loading, error, fetchMore }: any = useQuery(CountriesQuery, {
    variables: { limit, offset, includeInactive },
  });

  const countries = data?.countries || [];

  const loadMore = () => fetchMore({ variables: { offset: countries.length } });

  return {
    countries,
    loading,
    error,
    loadMore,
  };
};

export default useCountries;
