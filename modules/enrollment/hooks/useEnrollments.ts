import { useQuery, gql } from '@apollo/client';
import EnrollmentFragment from '../fragments/EnrollmentFragment';

export const EnrollmentsQuery = gql`
  query Enrollments(
    $offset: Int
    $limit: Int
    $queryString: String
    $sort: [SortOptionInput!]
  ) {
    enrollments(
      offset: $offset
      limit: $limit
      queryString: $queryString
      sort: $sort
    ) {
      ...EnrollmentFragment
    }
    enrollmentsCount
  }
  ${EnrollmentFragment}
`;

const useEnrollments = ({
  limit = 20,
  offset = 0,
  queryString = '',
  sort = [],
} = {}) => {
  const { data, loading, error } = useQuery(EnrollmentsQuery, {
    variables: { limit, offset, queryString, sort },
  });
  const enrollments = data?.enrollments || [];
  const enrollmentsCount = data?.enrollmentsCount;
  const hasMore = enrollments?.length < enrollmentsCount;

  return {
    enrollments,
    enrollmentsCount,
    hasMore,
    loading,
    error,
  };
};

export default useEnrollments;
