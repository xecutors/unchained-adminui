import { useQuery, gql } from '@apollo/client';
import WorkFragment from '../fragments/WorkFragment';

export const WorkQuery = gql`
  query Work($workId: ID!) {
    work(workId: $workId) {
      ...WorkFragment
      input
      result
      error
      priority
      worker
      retries
      original {
        _id
      }
      timeout
    }
  }
  ${WorkFragment}
`;

const useWork = ({ workId = null, ...options } = {}) => {
  const { data, loading, error } = useQuery(WorkQuery, {
    skip: !workId,
    variables: { workId },
    ...options,
  });

  return {
    work: data?.work,
    loading,
    error,
  };
};

export default useWork;
