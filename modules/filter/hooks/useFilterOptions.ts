import { useQuery, gql } from '@apollo/client';
import FilterOptionFragment from '../fragments/FilterOptionFragment';

export const FilterOptionsQuery = gql`
  query FilterOptions($filterId: ID) {
    filter(filterId: $filterId) {
      _id
      options {
        ...FilterOptionFragment
      }
    }
  }
  ${FilterOptionFragment}
`;

const useFilterOptions = ({ filterId = null } = {}) => {
  const { data, loading, error } = useQuery(FilterOptionsQuery, {
    skip: !filterId,
    variables: { filterId },
  });

  return {
    filterOptions: data?.filter?.options || [],
    loading,
    error,
  };
};

export default useFilterOptions;
