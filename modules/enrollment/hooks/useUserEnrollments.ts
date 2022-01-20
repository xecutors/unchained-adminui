import { useQuery, gql } from '@apollo/client';
import EnrollmentFragment from '../fragments/EnrollmentFragment';

export const EnrollmentsQuery = gql`
  query Enrollments($userId: ID!) {
    user(userId: $userId) {
      _id
      enrollments {
        ...EnrollmentFragment
      }
    }
  }
  ${EnrollmentFragment}
`;

const useUserEnrollments = ({ userId = null } = {}) => {
  const { data, loading, error } = useQuery(EnrollmentsQuery, {
    variables: { userId },
  });
  const enrollments = data?.user?.enrollments || [];

  return {
    enrollments,
    loading,
    error,
  };
};

export default useUserEnrollments;
