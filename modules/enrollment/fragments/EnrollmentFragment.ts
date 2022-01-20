import { gql } from '@apollo/client';

const EnrollmentFragment = gql`
  fragment EnrollmentFragment on Enrollment {
    _id
    country {
      _id
      isoCode
    }
    enrollmentNumber
    updated
    status
    created
    expires
    isExpired
    periods {
      start
      end
      isTrial
    }
    plan {
      product {
        _id
      }
      quantity
    }
    user {
      _id
      username
    }
  }
`;

export default EnrollmentFragment;
