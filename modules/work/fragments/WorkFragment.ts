import { gql } from '@apollo/client';

const WorkFragment = gql`
  fragment WorkFragment on Work {
    _id
    type
    scheduled
    status
    started
    success
    finished
    created
    deleted
  }
`;

export default WorkFragment;
