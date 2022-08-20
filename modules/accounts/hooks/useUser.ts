import { useQuery, gql } from '@apollo/client';
import UserFragment from '../fragment/UserFragment';

export const UserQuery = gql`
  query User($userId: ID) {
    user(userId: $userId) {
      ...UserFragment
    }
  }
  ${UserFragment}
`;

const useUser = ({ userId = null } = {}) => {
  const { data, loading, error } = useQuery(UserQuery, {
    fetchPolicy: 'cache-first',
    skip: !userId,
    variables: { userId },
  });

  const user = data?.user;

  return {
    user,
    shopInfo: data?.shopInfo,
    loading,
    error,
  };
};

export default useUser;
