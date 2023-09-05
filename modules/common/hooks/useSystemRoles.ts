import { useQuery, gql } from '@apollo/client';
import {
  ISystemRolesQuery,
  ISystemRolesQueryVariables,
} from '../../../gql/types';

export const SystemRolesQuery = gql`
  query SystemRoles {
    shopInfo {
      _id
      userRoles
    }
  }
`;

const useSystemRoles = () => {
  const { data, loading, error } = useQuery<
    ISystemRolesQuery,
    ISystemRolesQueryVariables
  >(SystemRolesQuery);
  return {
    systemRoles: data?.shopInfo?.userRoles || [],
    loading,
    error,
  };
};

export default useSystemRoles;
