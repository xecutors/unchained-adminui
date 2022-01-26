import { useQuery, gql } from '@apollo/client';

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
  const { data, loading, error } = useQuery(FilterTypesQuery);

  const filterTypes = data?.filterTypes?.options || [];

  return {
    filterTypes,
    loading,
    error,
  };
};

export default useFilterTypes;
