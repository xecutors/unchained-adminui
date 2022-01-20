import { gql } from '@apollo/client';

const LogFragment = gql`
  fragment LogFragment on Log {
    _id
    created
    level
    user {
      _id
      username
    }
    order {
      orderNumber
    }
    message
  }
`;

export default LogFragment;
