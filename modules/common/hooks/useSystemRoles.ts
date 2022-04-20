import { useQuery, gql } from '@apollo/client';

export const SystemRolesQuery = gql`
  query SystemRoles {
    shopInfo {
      _id
      userRoles
    }
  }
`;

const useSystemRoles = () => {
  const { data, loading, error } = useQuery(SystemRolesQuery);
  return {
    systemRoles: data?.shopInfo?.userRoles || [],
    loading,
    error,
  };
};

export default useSystemRoles;
