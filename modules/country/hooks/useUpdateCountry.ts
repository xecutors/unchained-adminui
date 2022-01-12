import { useMutation, gql } from '@apollo/client';

const UpdateCountryMutation = gql`
  mutation UpdateCountry($country: UpdateCountryInput!, $countryId: ID!) {
    updateCountry(country: $country, countryId: $countryId) {
      _id
      isoCode
      isActive
      defaultCurrency {
        _id
      }
    }
  }
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
      refetchQueries: ['Country', 'Countries'],
    });
  };

  return {
    updateCountry,
  };
};

export default useUpdateCountry;
