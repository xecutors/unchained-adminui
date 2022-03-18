import { useQuery, gql } from '@apollo/client';
import FilterFragment from '../fragments/FilterFragment';

export const FilterQuery = gql`
  query Filter($filterId: ID) {
    filter(filterId: $filterId) {
      ...FilterFragment
    }
  }
  ${FilterFragment}
`;

const useFilter = ({ filterId = null } = {}) => {
  const { data, loading, error } = useQuery(FilterQuery, {
    skip: !filterId,
    variables: { filterId },
  });

  return {
    filter: data?.filter,
    loading,
    error,
  };
};

export default useFilter;
