import { useMutation, gql } from '@apollo/client';
import CountryFragment from '../fragments/CountryFragment';
import { CountriesQuery } from './useCountries';

const CreateCountryMutation = gql`
  mutation CreateCountry($country: CreateCountryInput!) {
    createCountry(country: $country) {
      ...CountryFragment
    }
  }
  ${CountryFragment}
`;

const useCreateCountry = () => {
  const [createCountryMutation, { data, loading, error }] = useMutation(
    CreateCountryMutation,
  );

  const createCountry = async ({ isoCode }) => {
    return createCountryMutation({
      variables: { country: { isoCode } },
      refetchQueries: [{ query: CountriesQuery, variables: {} }],
    });
  };
  const newCountry = data?.createCountry;
  return {
    createCountry,
    newCountry,
    loading,
    error,
  };
};

export default useCreateCountry;
