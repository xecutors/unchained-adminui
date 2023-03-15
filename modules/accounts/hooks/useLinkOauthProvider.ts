import { useMutation, gql } from '@apollo/client';

const LinkOauthProviderMutation = gql`
  mutation LinkOauthProvider(
    $authorizationCode: String!
    $provider: String!
    $redirectUrl: String!
  ) {
    linkOauthProvider(
      provider: $provider
      authorizationCode: $authorizationCode
      redirectUrl: $redirectUrl
    ) {
      _id
      linkedOauthProviders {
        provider
        data {
          authorizationCode
          email
          address
          avatarUrl
          birthDate
          city
          company
          countryCode
          displayName
          firstName
          gender
          lastName
          phoneNumber
        }
      }
    }
  }
`;

const useLinkOauthProvider = () => {
  const [linkOauthProviderMutation] = useMutation(LinkOauthProviderMutation);

  const linkOauthProvider = async ({
    provider,
    authorizationCode,
    redirectUrl,
  }) => {
    return linkOauthProviderMutation({
      variables: { provider, authorizationCode, redirectUrl },
    });
  };

  return {
    linkOauthProvider,
  };
};

export default useLinkOauthProvider;
