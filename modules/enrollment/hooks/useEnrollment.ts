import { useQuery, gql } from '@apollo/client';
import EnrollmentDetailFragment from '../fragments/EnrollmentDetailFragment';

export const EnrollmentQuery = gql`
  query Enrollment($enrollmentId: ID!) {
    enrollment(enrollmentId: $enrollmentId) {
      ...EnrollmentDetailFragment
    }
  }
  ${EnrollmentDetailFragment}
`;

const useEnrollment = ({ enrollmentId = null } = {}) => {
  const { data, loading, error } = useQuery(EnrollmentQuery, {
    skip: !enrollmentId,
    variables: { enrollmentId },
  });
  const enrollment = data?.enrollment || {};

  return {
    enrollment,
    loading,
    error,
  };
};

export default useEnrollment;
