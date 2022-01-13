import { useQuery, gql } from '@apollo/client';

export const LogsCountQuery = gql`
  query LogsCount {
    logsCount
  }
`;

const useLogsCount = () => {
  const {
    data: { logsCount },
    loading,
    error,
  } = useQuery(LogsCountQuery);

  return {
    logsCount,
    loading,
    error,
  };
};

export default useLogsCount;
