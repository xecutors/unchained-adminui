import { useQuery, gql } from '@apollo/client';

export const CountriesCountQuery = gql`
  query CountriesCount($includeInactive: Boolean) {
    countriesCount(includeInactive: $includeInactive)
  }
`;

const useCountriesCount = ({ includeInactive = false } = {}) => {
  const {
    data: { countriesCount },
    loading,
    error,
  } = useQuery(CountriesCountQuery, {
    variables: { includeInactive },
  });

  return {
    countriesCount,
    loading,
    error,
  };
};

export default useCountriesCount;
