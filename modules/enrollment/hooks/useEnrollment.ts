import { useQuery, gql } from '@apollo/client';
import useUnchainedContext from '../../UnchainedContext/useUnchainedContext';
import EnrollmentDetailFragment from '../fragments/EnrollmentDetailFragment';

export const GetEnrollmentQuery = (inlineFragment = '') => gql`
  query Enrollment($enrollmentId: ID!) {
    enrollment(enrollmentId: $enrollmentId) {
      ...EnrollmentDetailFragment
      ${inlineFragment}

    }
  }
  ${EnrollmentDetailFragment}
`;

const useEnrollment = ({ enrollmentId = null } = {}) => {
  const { customProperties } = useUnchainedContext();
  const { data, loading, error } = useQuery(
    GetEnrollmentQuery(customProperties?.Enrollment),
    {
      skip: !enrollmentId,
      variables: { enrollmentId },
    },
  );
  const enrollment = data?.enrollment || {};

  return {
    enrollment,
    loading,
    error,
  };
};

export default useEnrollment;
