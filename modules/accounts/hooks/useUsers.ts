import { useQuery, gql } from '@apollo/client';
import UserFragment from '../fragment/UserFragment';

export const UsersQuery = gql`
  query users(
    $limit: Int
    $offset: Int
    $includeGuests: Boolean
    $queryString: String
  ) {
    users(
      limit: $limit
      offset: $offset
      includeGuests: $includeGuests
      queryString: $queryString
    ) {
      ...UserFragment
    }
  }
  ${UserFragment}
`;

const useUsers = ({
  limit = 20,
  offset = 0,
  includeGuests = false,
  queryString = null,
}) => {
  const { data, loading, error } = useQuery(UsersQuery, {
    variables: { limit, offset, includeGuests, queryString },
  });

  const users = data?.users;

  return {
    users,
    loading,
    error,
  };
};

export default useUsers;
