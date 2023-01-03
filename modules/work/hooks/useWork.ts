import { useQuery, gql } from '@apollo/client';
import useUnchainedContext from '../../UnchainedContext/useUnchainedContext';
import WorkFragment from '../fragments/WorkFragment';

export const GetWorkQuery = (inlineFragment = '') => gql`
  query Work($workId: ID!) {
    work(workId: $workId) {
      ...WorkFragment
      ${inlineFragment}
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
  const { customProperties } = useUnchainedContext();
  const { data, loading, error } = useQuery(
    GetWorkQuery(customProperties?.Work),
    {
      skip: !workId,
      variables: { workId },
      ...options,
    },
  );

  return {
    work: data?.work,
    loading,
    error,
  };
};

export default useWork;
