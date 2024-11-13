import { useQuery, gql } from '@apollo/client';
import { IUsersQuery, IUsersQueryVariables } from '../../../gql/types';
import UserFragment from '../fragment/UserFragment';

const UsersQuery = gql`
  query Users(
    $limit: Int
    $offset: Int
    $includeGuests: Boolean
    $queryString: String
    $loginWithinDays: DateFilterInput
    $verificationStatus: UserVerificationFilter
  ) {
    users(
      limit: $limit
      offset: $offset
      includeGuests: $includeGuests
      queryString: $queryString
      loginWithinDays: $loginWithinDays
      verificationStatus: $verificationStatus
    ) {
      ...UserFragment
    }
    usersCount(
      includeGuests: $includeGuests
      queryString: $queryString
      loginWithinDays: $loginWithinDays
      verificationStatus: $verificationStatus
    )
  }
  ${UserFragment}
`;

const useUsers = ({
  limit = 20,
  offset = 0,
  includeGuests = false,
  queryString = null,
  loginWithinDays = null,
  verificationStatus = null,
}: IUsersQueryVariables) => {
  const { data, loading, error, fetchMore } = useQuery<
    IUsersQuery,
    IUsersQueryVariables
  >(UsersQuery, {
    variables: {
      limit,
      offset,
      includeGuests,
      queryString,
      loginWithinDays,
      verificationStatus,
    },
  });

  const users = data?.users || [];
  const usersCount = data?.usersCount;
  const hasMore = users?.length < usersCount;

  const loadMore = () => {
    fetchMore({
      variables: { offset: users?.length },
    });
  };

  return {
    users,
    usersCount,
    hasMore,
    loading,
    error,
    loadMore,
  };
};

export default useUsers;
