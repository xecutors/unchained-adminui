import { useMutation, gql } from '@apollo/client';

const RemoveCountryMutation = gql`
  mutation RemoveCountry($countryId: ID!) {
    removeCountry(countryId: $countryId) {
      _id
    }
  }
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
