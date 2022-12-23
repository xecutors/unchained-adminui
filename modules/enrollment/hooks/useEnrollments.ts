import { useQuery, gql } from '@apollo/client';
import EnrollmentFragment from '../fragments/EnrollmentFragment';

export const EnrollmentsQuery = gql`
  query Enrollments(
    $offset: Int
    $limit: Int
    $queryString: String
    $sort: [SortOptionInput!]
    $status: [String!]
  ) {
    enrollments(
      offset: $offset
      limit: $limit
      queryString: $queryString
      sort: $sort
      status: $status
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
  status = null,
} = {}) => {
  const { data, loading, error } = useQuery(EnrollmentsQuery, {
    variables: { limit, offset, queryString, sort, status },
  });
  const enrollments = data?.enrollments || [];
  const enrollmentsCount = data?.enrollmentsCount;

  return {
    enrollments,
    enrollmentsCount,
    loading,
    error,
  };
};

export default useEnrollments;
