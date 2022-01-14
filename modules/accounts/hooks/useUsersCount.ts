import { useQuery, gql } from '@apollo/client';

export const UsersCountQuery = gql`
  query UsersCount($includeGuests: Boolean, $queryString: String) {
    usersCount(includeGuests: $includeGuests, queryString: $queryString)
  }
`;

const useUsersCount = ({ includeGuests = false, queryString = '' } = {}) => {
  const { data, loading, error } = useQuery(UsersCountQuery, {
    variables: { includeGuests, queryString },
  });

  return {
    usersCount: data?.usersCount,
    loading,
    error,
  };
};

export default useUsersCount;
