import { useQuery, gql } from '@apollo/client';
import LogFragment from '../fragment/LogFragment';

export const UserLogQuery = gql`
  query UserLogs($userId: ID) {
    user(userId: $userId) {
      logs {
        ...LogFragment
      }
    }
  }
  ${LogFragment}
`;

const useUserLogs = ({ userId = null } = {}) => {
  const { data, loading, error } = useQuery(UserLogQuery, {
    variables: { userId },
  });

  const logs = data?.user?.logs;

  return {
    logs,
    loading,
    error,
  };
};

export default useUserLogs;
