import { useQuery, gql } from '@apollo/client';
import UserFragment from '../fragment/UserFragment';

export const UsersQuery = gql`
  query User($userId: ID) {
    user(userId: $userId) {
      ...UserFragment
    }
    shopInfo {
      _id
      userRoles
    }
  }
  ${UserFragment}
`;

const useUser = ({ userId = null } = {}) => {
  const { data, loading, error } = useQuery(UsersQuery, {
    variables: { userId },
  });

  const user = data?.user;

  return {
    user,
    loading,
    error,
  };
};

export default useUser;
