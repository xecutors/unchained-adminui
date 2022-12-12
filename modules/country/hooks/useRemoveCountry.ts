import { useMutation, gql } from '@apollo/client';
import CountryFragment from '../fragments/CountryFragment';

const RemoveCountryMutation = gql`
  mutation RemoveCountry($countryId: ID!) {
    removeCountry(countryId: $countryId) {
      ...CountryFragment
    }
  }
  ${CountryFragment}
`;

const useRemoveCountry = () => {
  const [removeCountryMutation] = useMutation(RemoveCountryMutation);

  const removeCountry = async ({ countryId }) => {
    return removeCountryMutation({
      variables: { countryId },
      refetchQueries: ['Countries'],
    });
  };

  return {
    removeCountry,
  };
};

export default useRemoveCountry;
