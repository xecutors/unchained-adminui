import { useMutation, gql } from '@apollo/client';
import MD5MetaDataFragment from '../fragment/MD5MetaDataFragment';
import UserFragment from '../fragment/UserFragment';

const AddWebAuthnCredentialsMutation = gql`
  mutation AddWebAuthnCredentials($credentials: JSON!) {
    addWebAuthnCredentials(credentials: $credentials) {
      ...UserFragment
      webAuthnCredentials {
        _id
        created
        aaguid
        counter
        mdsMetadata {
          ...MD5MetaDataFragment
        }
      }
    }
  }
  ${UserFragment}
  ${MD5MetaDataFragment}
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
