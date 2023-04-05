import { useMutation, gql } from '@apollo/client';

const LinkOauthProviderMutation = gql`
  mutation linkOAuthAccount(
    $authorizationCode: String!
    $provider: String!
    $redirectUrl: String!
  ) {
    linkOAuthAccount(
      provider: $provider
      authorizationCode: $authorizationCode
      redirectUrl: $redirectUrl
    ) {
      _id
      oAuthAccounts {
        _id
        provider
        authorizationCode
        
      }
    }
  }
`;

const useLinkOauthProvider = () => {
  const [linkOauthProviderMutation] = useMutation(LinkOauthProviderMutation);

  const linkOAuthAccount = async ({
    provider,
    authorizationCode,
    redirectUrl,
  }) => {
    return linkOauthProviderMutation({
      variables: { provider, authorizationCode, redirectUrl },
    });
  };

  return {
    linkOAuthAccount,
  };
};

export default useLinkOauthProvider;
