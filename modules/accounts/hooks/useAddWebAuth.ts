import { useMutation, gql } from '@apollo/client';
import UserFragment from '../fragment/UserFragment';

const AddWebAuthMutation = gql`
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

const useAddWebAuth = () => {
  const [addWebAuthnCredentials] = useMutation(AddWebAuthMutation);

  const addWebAuth = async ({ credentials }) => {
    return addWebAuthnCredentials({ variables: { credentials } });
  };

  return {
    addWebAuth,
  };
};

export default useAddWebAuth;
