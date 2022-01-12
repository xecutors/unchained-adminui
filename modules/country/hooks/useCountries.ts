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

const useCountries = ({ limit = 20, offset = 0, includeInactive = true }) => {
  const {
    data: { countries },
    loading,
    error,
  } = useQuery(CountriesQuery, {
    variables: { limit, offset, includeInactive },
  });

  return {
    countries,
    loading,
    error,
  };
};

export default useCountries;
