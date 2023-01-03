import { useQuery, gql } from '@apollo/client';
import useUnchainedContext from '../../UnchainedContext/useUnchainedContext';
import CountryFragment from '../fragments/CountryFragment';

export const GetCountryQuery = (inlineFragment = '') => gql`
  query Country($countryId: ID!) {
    country(countryId: $countryId) {
      ...CountryFragment
      ${inlineFragment}
    }
  }
  ${CountryFragment}
`;

const useCountry = ({ countryId }) => {
  const { customProperties } = useUnchainedContext();
  const { data, loading, error } = useQuery(
    GetCountryQuery(customProperties?.Country),
    {
      skip: !countryId,
      variables: { countryId },
    },
  );

  return {
    country: data?.country,
    loading,
    error,
  };
};

export default useCountry;
