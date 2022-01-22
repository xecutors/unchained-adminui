import { useQuery, gql } from '@apollo/client';
import EnrollmentFragment from '../fragments/EnrollmentFragment';

export const UserEnrollmentsQuery = gql`
  query UserEnrollments($userId: ID!) {
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
  const { data, loading, error } = useQuery(UserEnrollmentsQuery, {
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
