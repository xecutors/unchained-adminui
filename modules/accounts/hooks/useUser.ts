import { useQuery, gql } from '@apollo/client';
import UserFragment from '../fragment/UserFragment';

export const UsersQuery = gql`
  query User(
    userId: ID
  ) {
    user(
      userId: $userId
    ) {
      ...UserFragment
    }
  }
  ${UserFragment}
`;

const useUsers = ({ userId = null } = null) => {
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

export default useUsers;
