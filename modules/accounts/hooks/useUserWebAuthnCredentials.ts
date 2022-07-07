import { useQuery, gql } from '@apollo/client';

export const UserWebAuthnCredentialsQuery = gql`
  query UserWebAuthnCredentials($userId: ID!) {
    user(userId: $userId) {
      _id
      webAuthnCredentials {
        _id
        created
        aaguid
        counter
        mdsMetadata {
          legalHeader
          description
          authenticatorVersion
          protocolFamily
          schema
          authenticationAlgorithms
          publicKeyAlgAndEncodings
          attestationTypes
          keyProtection
          upv
          tcDisplay

          authenticationAlgorithms
          publicKeyAlgAndEncodings
          icon
          authenticatorGetInfo
        }
      }
    }
  }
`;

const useUserWebAuthnCredentials = ({ userId }) => {
  const { data, loading, error } = useQuery(UserWebAuthnCredentialsQuery, {
    variables: { userId },
  });

  return {
    webAuthnCredentials: data?.user?.webAuthnCredentials,
    loading,
    error,
  };
};

export default useUserWebAuthnCredentials;
