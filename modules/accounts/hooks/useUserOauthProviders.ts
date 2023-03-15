import { useQuery, gql } from '@apollo/client';

export const UserOauthProvidersQuery = gql`
  query UserOauthProviders($userId: ID!) {
    user(userId: $userId) {
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

const useUserOauthProviders = ({ userId }) => {
  const { data, loading, error } = useQuery(UserOauthProvidersQuery, {
    variables: { userId },
  });

  return {
    linkedOauthProviders: data?.user?.linkedOauthProviders || [],
    loading,
    error,
  };
};

export default useUserOauthProviders;
