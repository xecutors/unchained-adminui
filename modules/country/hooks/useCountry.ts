import { useQuery, gql } from '@apollo/client';
import CountryFragment from '../fragments/CountryFragment';

export const CountryQuery = gql`
  query Country($countryId: ID!) {
    country(countryId: $countryId) {
      ...CountryFragment
    }
  }
  ${CountryFragment}
`;

const useCountry = ({ countryId }) => {
  const { data, loading, error } = useQuery(CountryQuery, {
    variables: { countryId },
  });

  return {
    country: data?.country,
    loading,
    error,
  };
};

export default useCountry;
