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
  }
`;

const useLogs = ({ limit = 20, offset = 0 }) => {
  const {
    data: { logs },
    loading,
    error,
    fetchMore,
  } = useQuery(LogsQuery, {
    variables: { limit, offset },
    pollInterval: 1000,
  });

  const loadMore = () =>
    fetchMore({ variables: { offset: logs?.length || 0 } });

  return {
    logs,
    loading,
    error,
    loadMore,
  };
};

export default useLogs;
