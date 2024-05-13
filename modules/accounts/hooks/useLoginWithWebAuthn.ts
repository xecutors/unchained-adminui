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
  const [loginWithWebAuthnMutation] = useMutation<
    ILoginWithWebAuthnMutation,
    ILoginWithWebAuthnMutationVariables
  >(LogWithWebAuthnMutation);

  const loginWithWebAuthn = async ({
    webAuthnPublicKeyCredentials,
  }: ILoginWithWebAuthnMutationVariables) => {
    return loginWithWebAuthnMutation({
      variables: { webAuthnPublicKeyCredentials },
    });
  };
  return { loginWithWebAuthn };
};

export default useLoginWithWebAuthn;
