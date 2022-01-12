import { useQuery, gql } from '@apollo/client';

export const CurrentUserQuery = gql`
  query CurrentUser {
    me {
      _id
      name
      isGuest
      primaryEmail {
        address
        verified
      }
      roles
    }
  }
`;

const useCurrentUser = () => {
  const { data, loading, error } = useQuery(CurrentUserQuery, {
    variables: {},
    fetchPolicy: 'network-only',
  });

  const currentUser = data?.me
    ? (data?.me.roles || []).indexOf('admin') !== -1 && data?.me
    : null;

  return {
    currentUser,
    loading,
    error,
  };
};

export default useCurrentUser;
