import { gql, useMutation } from '@apollo/client';
import {
  ILoginWithWebAuthnMutation,
  ILoginWithWebAuthnMutationVariables,
} from '../../../gql/types';

const LogWithWebAuthnMutation = gql`
  mutation LoginWithWebAuthn($webAuthnPublicKeyCredentials: JSON!) {
    loginWithWebAuthn(
      webAuthnPublicKeyCredentials: $webAuthnPublicKeyCredentials
    ) {
      _id
      tokenExpires
    }
  }
`;

const useLoginWithWebAuthn = () => {
  const [loginWithWebAuthnMutation, { client }] = useMutation<
    ILoginWithWebAuthnMutation,
    ILoginWithWebAuthnMutationVariables
  >(LogWithWebAuthnMutation);

  const loginWithWebAuthn = async ({
    webAuthnPublicKeyCredentials,
  }: ILoginWithWebAuthnMutationVariables) => {
    const result = loginWithWebAuthnMutation({
      variables: { webAuthnPublicKeyCredentials },
    });
    await client.resetStore();
    return result;
  };
  return { loginWithWebAuthn };
};

export default useLoginWithWebAuthn;
