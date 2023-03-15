import { useMutation, gql } from '@apollo/client';

const UnLinkOauthProviderMutation = gql`
  mutation UnLinkOauthProvider(
    $authorizationCode: String!
    $provider: String!
  ) {
    unlinkOauthProvider(
      provider: $provider
      authorizationCode: $authorizationCode
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

const useUnLinkOauthProvider = () => {
  const [unLinkOauthProviderMutation] = useMutation(
    UnLinkOauthProviderMutation,
  );

  const unlinkOauthProvider = async ({ provider, authorizationCode }) => {
    return unLinkOauthProviderMutation({
      variables: { provider, authorizationCode },
    });
  };

  return {
    unlinkOauthProvider,
  };
};

export default useUnLinkOauthProvider;
