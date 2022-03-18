import { useQuery, gql } from '@apollo/client';
import EnrollmentFragment from '../fragments/EnrollmentFragment';

export const EnrollmentQuery = gql`
  query Enrollment($enrollmentId: ID!) {
    enrollment(enrollmentId: $enrollmentId) {
      ...EnrollmentFragment
    }
  }
  ${EnrollmentFragment}
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
