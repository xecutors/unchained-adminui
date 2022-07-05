import { useQuery, gql } from '@apollo/client';
import EnrollmentFragment from '../fragments/EnrollmentFragment';

export const UserEnrollmentsQuery = gql`
  query UserEnrollments($userId: ID!, $queryString: String) {
    user(userId: $userId, queryString: $queryString) {
      _id
      enrollments {
        ...EnrollmentFragment
      }
    }
  }
  ${EnrollmentFragment}
`;

const useUserEnrollments = ({ userId = null, queryString = '' } = {}) => {
  const { data, loading, error } = useQuery(UserEnrollmentsQuery, {
    variables: { userId, queryString },
  });
  const enrollments = data?.user?.enrollments || [];

  return {
    enrollments,
    loading,
    error,
  };
};

export default useUserEnrollments;
