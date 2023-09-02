import { gql, useMutation } from '@apollo/client';
import {
  ICreateWebAuthnCredentialRequestOptionsMutation,
  ICreateWebAuthnCredentialRequestOptionsMutationVariables,
} from '../../../gql/types';

const CreateWebAuthnCredentialRequestOptionsMutation = gql`
  mutation CreateWebAuthnCredentialRequestOptions($username: String) {
    createWebAuthnCredentialRequestOptions(username: $username)
  }
`;

const useCreateWebAuthnCredentialRequestOptions = () => {
  const [createWebAuthnCredentialRequestOptionsMutation] = useMutation<
    ICreateWebAuthnCredentialRequestOptionsMutation,
    ICreateWebAuthnCredentialRequestOptionsMutationVariables
  >(CreateWebAuthnCredentialRequestOptionsMutation);

  const createWebAuthnCredentialRequestOptions = async ({
    username,
  }: ICreateWebAuthnCredentialRequestOptionsMutationVariables) => {
    return createWebAuthnCredentialRequestOptionsMutation({
      variables: { username },
    });
  };
  return { createWebAuthnCredentialRequestOptions };
};

export default useCreateWebAuthnCredentialRequestOptions;
