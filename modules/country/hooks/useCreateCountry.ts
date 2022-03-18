import { useMutation, gql } from '@apollo/client';

const CreateCountryMutation = gql`
  mutation CreateCountry($country: CreateCountryInput!) {
    createCountry(country: $country) {
      _id
    }
  }
`;

const useCreateCountry = () => {
  const [createCountryMutation] = useMutation(CreateCountryMutation);

  const createCountry = async ({ isoCode }) => {
    return createCountryMutation({
      variables: { country: { isoCode } },
      refetchQueries: ['Countries', 'Country'],
    });
  };

  return {
    createCountry,
  };
};

export default useCreateCountry;
