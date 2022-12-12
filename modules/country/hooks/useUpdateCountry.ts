import { useMutation, gql } from '@apollo/client';
import CountryFragment from '../fragments/CountryFragment';

const UpdateCountryMutation = gql`
  mutation UpdateCountry($country: UpdateCountryInput!, $countryId: ID!) {
    updateCountry(country: $country, countryId: $countryId) {
      ...CountryFragment
    }
  }
  ${CountryFragment}
`;

const useUpdateCountry = () => {
  const [updateCountryMutation] = useMutation(UpdateCountryMutation);

  const updateCountry = async ({
    isoCode,
    isActive,
    defaultCurrencyId,
    countryId,
  }) => {
    return updateCountryMutation({
      variables: {
        country: { isoCode, isActive, defaultCurrencyId },
        countryId,
      },
    });
  };

  return {
    updateCountry,
  };
};

export default useUpdateCountry;
