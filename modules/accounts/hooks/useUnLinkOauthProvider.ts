import { useMutation, gql } from '@apollo/client';

const UnLinkOauthProviderMutation = gql`
  mutation unlinkOAuthAccount(
    $authorizationCode: String!
    $provider: String!
  ) {
    unlinkOAuthAccount(
      provider: $provider
      authorizationCode: $authorizationCode
    ) {
      _id
      oAuthAccounts {
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

  const unlinkOAuthAccount = async ({ provider, authorizationCode }) => {
    return unLinkOauthProviderMutation({
      variables: { provider, authorizationCode },
    });
  };

  return {
    unlinkOAuthAccount,
  };
};

export default useUnLinkOauthProvider;
