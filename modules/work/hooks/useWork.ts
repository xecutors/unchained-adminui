import { useQuery, gql } from '@apollo/client';
import WorkFragment from '../fragments/WorkFragment';

export const WorkQuery = gql`
  query Work($workId: ID!) {
    work(workId: $workId) {
      ...WorkFragment
    }
  }
  ${WorkFragment}
`;

const useWork = ({ workId = null } = {}) => {
  const { data, loading, error } = useQuery(WorkQuery, {
    variables: { workId },
  });

  return {
    language: data?.language,
    loading,
    error,
  };
};

export default useWork;
