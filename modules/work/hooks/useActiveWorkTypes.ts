import { useQuery, gql } from '@apollo/client';
import {
  IActiveWorkTypesQuery,
  IActiveWorkTypesQueryVariables,
} from '../../../gql/types';

export const ActiveWorkTypeQuery = gql`
  query ActiveWorkTypes {
    activeWorkTypes
  }
`;

const useActiveWorkTypes = () => {
  const { data, loading, error } = useQuery<
    IActiveWorkTypesQuery,
    IActiveWorkTypesQueryVariables
  >(ActiveWorkTypeQuery);

  const activeWorkTypes = data?.activeWorkTypes || [];

  return {
    activeWorkTypes,
    loading,
    error,
  };
};

export default useActiveWorkTypes;
