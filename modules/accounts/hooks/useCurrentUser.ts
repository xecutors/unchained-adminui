import { useQuery, gql } from '@apollo/client';
import UserFragment from '../fragment/UserFragment';

export const CurrentUserQuery = gql`
  query CurrentUser {
    me {
      ...UserFragment
    }
  }
  ${UserFragment}
`;

const useCurrentUser = () => {
  const { data, loading, error } = useQuery(CurrentUserQuery, {
    variables: {},
    fetchPolicy: 'network-only',
  });

  const currentUser = data?.me;

  return {
    currentUser,
    loading,
    error,
  };
};

export default useCurrentUser;
