import { gql, useMutation } from '@apollo/client';

const LogWithWebAuthnMutation = gql`
  mutation LoginWithWebAuthn($webAuthnPublicKeyCredentials: JSON) {
    loginWithWebAuthn(
      webAuthnPublicKeyCredentials: $webAuthnPublicKeyCredentials
    )
  }
`;

const useLoginWithWebAuth = () => {
  const [loginWithWebAuthn] = useMutation(LogWithWebAuthnMutation);

  const LogWithWebAuth = async ({ webAuthnPublicKeyCredentials }) => {
    return loginWithWebAuthn({
      variables: { webAuthnPublicKeyCredentials },
    });
  };
  return { LogWithWebAuth };
};

export default useLoginWithWebAuth;
