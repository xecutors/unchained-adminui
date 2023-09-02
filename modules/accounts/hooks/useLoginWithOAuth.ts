import { useMutation, gql, useApolloClient } from '@apollo/client';

const LogInWithOauthMutation = gql`
  mutation LogInWithOAuth(
    $authorizationCode: String!
    $provider: String!
    $redirectUrl: String!
  ) {
    loginWithOAuth(
      provider: $provider
      authorizationCode: $authorizationCode
      redirectUrl: $redirectUrl
    ) {
      id
      token
      tokenExpires
    }
  }
`;

const useLogInWithOAuth = () => {
  const apollo = useApolloClient();
  const [logInWithOAuthMutation] = useMutation(LogInWithOauthMutation);

  const logInWithOAuth = async ({ authorizationCode, provider }) => {
    const loginResult = await logInWithOAuthMutation({
      variables: { authorizationCode, provider },
      awaitRefetchQueries: true,
    });

    await apollo.resetStore();
    return loginResult;
  };

  return { logInWithOAuth };
};

export default useLogInWithOAuth;
