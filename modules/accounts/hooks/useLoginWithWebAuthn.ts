import { gql, useMutation } from '@apollo/client';

const LogWithWebAuthnMutation = gql`
  mutation LoginWithWebAuthn($webAuthnPublicKeyCredentials: JSON!) {
    loginWithWebAuthn(
      webAuthnPublicKeyCredentials: $webAuthnPublicKeyCredentials
    ) {
      id
      token
      tokenExpires
    }
  }
`;

const useLoginWithWebAuthn = () => {
  const [loginWithWebAuthnMutation, { error, reset, data, loading }] =
    useMutation(LogWithWebAuthnMutation);

  const loginWithWebAuthn = async ({ webAuthnPublicKeyCredentials }) => {
    return loginWithWebAuthnMutation({
      variables: { webAuthnPublicKeyCredentials },
    });
  };
  return { loginWithWebAuthn, error, reset, data, loading };
};

export default useLoginWithWebAuthn;
