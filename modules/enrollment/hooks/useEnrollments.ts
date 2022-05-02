import { useQuery, gql } from '@apollo/client';
import EnrollmentFragment from '../fragments/EnrollmentFragment';

export const EnrollmentsQuery = gql`
  query Enrollments($offset: Int, $limit: Int) {
    enrollments(offset: $offset, limit: $limit) {
      ...EnrollmentFragment
    }
    enrollmentsCount
  }
  ${EnrollmentFragment}
`;

const useEnrollments = ({ limit = 20, offset = 0 } = {}) => {
  const { data, loading, error, fetchMore } = useQuery(EnrollmentsQuery, {
    variables: { limit, offset },
  });
  const enrollments = data?.enrollments || [];
  const enrollmentsCount = data?.enrollmentsCount;
  const hasMore = enrollments?.length < enrollmentsCount;
  const loadMore = () => {
    fetchMore({
      variables: { offset: enrollments.length },
    });
  };

  return {
    enrollments,
    enrollmentsCount,
    hasMore,
    loading,
    error,
    loadMore,
  };
};

export default useEnrollments;
