import { gql } from '@apollo/client';

const SyncReportFragment = gql`
  fragment SyncReportFragment on SyncReport {
    sync {
      jobs {
        _id
        started
        finished
        sync {
          signal
          duration
        }
        crossbase {
          signal
          duration
        }
        solr {
          signal
          duration
        }
        categories {
          diff
          total
          new
          removed
        }
        filters {
          diff
          total
          new
          removed
        }
        products {
          diff
          total
          new
          removed
        }
      }
      stats {
        categories {
          diff
          total
          new
          removed
        }
        filters {
          diff
          total
          new
          removed
        }
        products {
          diff
          total
          new
          removed
        }
      }
    }
    products {
      published
      removed
    }
    assortments {
      published
      removed
    }
    revenue
    logins {
      default
      SWING
      PERGION
    }
    message
  }
`;

export default SyncReportFragment;
