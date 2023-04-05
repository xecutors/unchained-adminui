import { useQuery, gql } from '@apollo/client';

export const UserOauthProvidersQuery = gql`
  query UserOauthProviders($userId: ID!) {
    user(userId: $userId) {
      _id
      oAuthAccounts {
        _id
        provider
        authorizationCode
      }
    }
  }
`;

const useUserOauthProviders = ({ userId }) => {
  const { data, loading, error } = useQuery(UserOauthProvidersQuery, {
    variables: { userId },
  });

  return {
    oAuthAccounts: data?.user?.oAuthAccounts || [],
    loading,
    error,
  };
};

export default useUserOauthProviders;
