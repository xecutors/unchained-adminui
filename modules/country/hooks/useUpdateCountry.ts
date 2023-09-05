import { useMutation, gql } from '@apollo/client';
import {
  IUpdateCountryMutation,
  IUpdateCountryMutationVariables,
} from '../../../gql/types';
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
  const [updateCountryMutation] = useMutation<
    IUpdateCountryMutation,
    IUpdateCountryMutationVariables
  >(UpdateCountryMutation);

  const updateCountry = async ({
    country,
    countryId,
  }: IUpdateCountryMutationVariables) => {
    return updateCountryMutation({
      variables: {
        country,
        countryId,
      },
    });
  };

  return {
    updateCountry,
  };
};

export default useUpdateCountry;
