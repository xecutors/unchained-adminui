import { useQuery, gql } from '@apollo/client';
import {
  IFilterOptionsQuery,
  IFilterOptionsQueryVariables,
} from '../../../gql/types';
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

const useFilterOptions = ({
  filterId = null,
}: IFilterOptionsQueryVariables = {}) => {
  const { data, loading, error } = useQuery<
    IFilterOptionsQuery,
    IFilterOptionsQueryVariables
  >(FilterOptionsQuery, {
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
