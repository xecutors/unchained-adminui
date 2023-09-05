import { useMutation, gql, useApolloClient } from '@apollo/client';
import {
  ILogInWithOAuthMutation,
  ILogInWithOAuthMutationVariables,
} from '../../../gql/types';

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
  const [logInWithOAuthMutation] = useMutation<
    ILogInWithOAuthMutation,
    ILogInWithOAuthMutationVariables
  >(LogInWithOauthMutation);

  const logInWithOAuth = async ({
    authorizationCode,
    provider,
    redirectUrl,
  }: ILogInWithOAuthMutationVariables) => {
    const loginResult = await logInWithOAuthMutation({
      variables: { authorizationCode, provider, redirectUrl },
      awaitRefetchQueries: true,
    });

    await apollo.resetStore();
    return loginResult;
  };

  return { logInWithOAuth };
};

export default useLogInWithOAuth;
