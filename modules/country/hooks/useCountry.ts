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
    skip: !countryId,
    variables: { countryId },
  });

  return {
    country: data?.country,
    loading,
    error,
  };
};

export const preFetchCountry = async (apolloClient, { countryId = null }) => {
  const { data } = await apolloClient.query({
    query: CountryQuery,
    skip: !countryId,
    variables: { countryId },
  });
  return data?.country;
};

export default useCountry;
