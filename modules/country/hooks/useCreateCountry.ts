import { useMutation, gql } from '@apollo/client';

const CreateCountryMutation = gql`
  mutation CreateCountry($country: CreateCountryInput!) {
    createCountry(country: $country) {
      _id
    }
  }
`;

const useCreateCountry = () => {
  const [createCountryMutation, { data, loading, error }] = useMutation(
    CreateCountryMutation,
  );

  const createCountry = async ({ isoCode }) => {
    return createCountryMutation({
      variables: { country: { isoCode } },
      refetchQueries: ['Countries', 'Country'],
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
