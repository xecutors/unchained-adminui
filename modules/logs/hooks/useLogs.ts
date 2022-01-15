import { useQuery, gql } from '@apollo/client';

export const LogsQuery = gql`
  query Logs($offset: Int, $limit: Int) {
    logs(offset: $offset, limit: $limit) {
      _id
      created
      level
      message
      user {
        _id
        name
      }
      order {
        _id
        orderNumber
      }
    }
  }
`;

const useLogs = ({ limit = 20, offset = 0 }) => {
  const { data, loading, error, fetchMore } = useQuery(LogsQuery, {
    variables: { limit, offset },
    pollInterval: 1000,
  });

  const logs = data?.logs || [];
  const loadMore = () =>
    fetchMore({
      variables: { offset: logs?.length || 0 },
      updateQuery: (prev: any, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          logs: [...prev.logs, ...fetchMoreResult.logs],
        };
      },
    });

  return {
    logs,
    loading,
    error,
    loadMore,
  };
};

export default useLogs;
