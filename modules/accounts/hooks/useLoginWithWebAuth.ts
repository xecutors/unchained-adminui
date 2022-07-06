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

const useLoginWithWebAuth = () => {
  const [loginWithWebAuthn] = useMutation(LogWithWebAuthnMutation);

  const logWithWebAuth = async ({ webAuthnPublicKeyCredentials }) => {
    return loginWithWebAuthn({
      variables: { webAuthnPublicKeyCredentials },
    });
  };
  return { logWithWebAuth };
};

export default useLoginWithWebAuth;
