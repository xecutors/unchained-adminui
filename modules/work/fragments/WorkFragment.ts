import { gql } from '@apollo/client';

const WorkFragment = gql`
  fragment WorkFragment on Work {
    _id
    type
    scheduled
    status
    started
    finished
    created
    deleted
    priority
    worker
    input
    result
    error
    retries
    original {
      _id
    }
    timeout
  }
`;

export default WorkFragment;
