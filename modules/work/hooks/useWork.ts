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
    skip: !workId,
    variables: { workId },
  });

  return {
    work: data?.work,
    loading,
    error,
  };
};

export default useWork;
