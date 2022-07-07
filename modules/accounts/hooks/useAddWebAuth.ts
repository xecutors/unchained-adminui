import { useMutation, gql } from '@apollo/client';
import UserFragment from '../fragment/UserFragment';

const AddWebAuthnCredentialsMutation = gql`
  mutation AddWebAuthnCredentials($credentials: JSON) {
    addWebAuthnCredentials(credentials: $credentials) {
      ...UserFragment
      webAuthnCredentials {
        _id
        created
        aaguid
        counter
        mdsMetadata {
          legalHeader
        }
      }
    }
  }
  ${UserFragment}
`;

const useAddWebAuthnCredentials = () => {
  const [addWebAuthnCredentialsMutation] = useMutation(
    AddWebAuthnCredentialsMutation,
  );

  const addWebAuthnCredentials = async ({ credentials }) => {
    return addWebAuthnCredentialsMutation({
      variables: { credentials },
    });
  };

  return {
    addWebAuthnCredentials,
  };
};

export default useAddWebAuthnCredentials;
