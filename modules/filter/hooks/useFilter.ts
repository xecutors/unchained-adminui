import { useQuery, gql } from '@apollo/client';
import FilterFragment from '../fragments/FilterFragment';
import FilterOptionFragment from '../fragments/FilterOptionFragment';

export const FilterQuery = gql`
  query filter($filterId: ID) {
    filter(filterId: $filterId) {
      ...FilterFragment
      options {
        ...FilterOptionFragment
      }
    }
  }
  ${FilterFragment}
  ${FilterOptionFragment}
`;

const useFilter = ({ filterId = null } = {}) => {
  const { data, loading, error } = useQuery(FilterQuery, {
    variables: { filterId },
  });

  return {
    filter: data?.filter,
    loading,
    error,
  };
};

export default useFilter;
