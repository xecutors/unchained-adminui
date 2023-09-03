import { useQuery, gql } from '@apollo/client';
import {
  IFilterTypesQuery,
  IFilterTypesQueryVariables,
} from '../../../gql/types';

export const FilterTypesQuery = gql`
  query FilterTypes {
    filterTypes: __type(name: "FilterType") {
      options: enumValues {
        label: name
        value: name
      }
    }
  }
`;

const useFilterTypes = () => {
  const { data, loading, error } = useQuery<
    IFilterTypesQuery,
    IFilterTypesQueryVariables
  >(FilterTypesQuery);

  const filterTypes = data?.filterTypes?.options || [];

  return {
    filterTypes,
    loading,
    error,
  };
};

export default useFilterTypes;
