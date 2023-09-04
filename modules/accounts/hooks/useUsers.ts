import { useQuery, gql } from '@apollo/client';
import { IUsersQuery, IUsersQueryVariables } from '../../../gql/types';
import UserFragment from '../fragment/UserFragment';

export const UsersQuery = gql`
  query Users(
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
    usersCount(includeGuests: $includeGuests, queryString: $queryString)
  }
  ${UserFragment}
`;

const useUsers = ({
  limit = 20,
  offset = 0,
  includeGuests = false,
  queryString = null,
}: IUsersQueryVariables) => {
  const { data, loading, error } = useQuery<IUsersQuery, IUsersQueryVariables>(
    UsersQuery,
    {
      variables: { limit, offset, includeGuests, queryString },
    },
  );

  const users = data?.users || [];
  const usersCount = data?.usersCount;
  const hasMore = users?.length < usersCount;

  return {
    users,
    usersCount,
    hasMore,
    loading,
    error,
  };
};

export default useUsers;
