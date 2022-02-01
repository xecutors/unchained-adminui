import { useQuery, gql } from '@apollo/client';

export const ActiveWorkTypeQuery = gql`
  query ActiveWorkTypes {
    activeWorkTypes
  }
`;

const useActiveWorkTypes = () => {
  const { data, loading, error } = useQuery(ActiveWorkTypeQuery);

  const activeWorkTypes = data?.activeWorkTypes || [];

  return {
    activeWorkTypes,
    loading,
    error,
  };
};

export default useActiveWorkTypes;
