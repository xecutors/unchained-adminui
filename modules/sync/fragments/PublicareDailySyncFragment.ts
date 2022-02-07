import { gql } from '@apollo/client';

const PublicareDailySyncFragment = gql`
  fragment PublicareDailySyncFragment on PublicareDailySync {
    _id
    started
    finished
    updated
    success
    retries
    deleted
    # result {
    #   products {
    #     published
    #     removed
    #   }
    # }
    result {
      sync {
        stats {
          products {
            new
            removed
          }
        }
      }
    }
    worker
  }
`;

export default PublicareDailySyncFragment;
