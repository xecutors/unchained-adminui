import { base64url } from '../../common/utils/base64url';
import useCreateWebAuthnCredentialRequestOptions from './useCreateWebAuthnCredentialRequestOptions';

const useGenerateLoginCredentials = () => {
  const { createWebAuthnCredentialRequestOptions } =
    useCreateWebAuthnCredentialRequestOptions();
  const generateLoginCredentials = async ({ email }) => {
    const { data } = await createWebAuthnCredentialRequestOptions({
      username: email,
    });

    const publicKey = data?.createWebAuthnCredentialRequestOptions;
    // publicKey.challenge = base64ToArrayBuffer(publicKey.challenge);
    publicKey.challenge = base64url.decode(publicKey.challenge);

    // const textEncoder = new TextEncoder('utf-8');

    publicKey.allowCredentials =
      publicKey.allowCredentials?.map(({ id, ...rest }) => ({
        id: base64url.decode(id),
        ...rest,
      })) || [];

    publicKey.userVerification = 'preferred';
    // publicKey.user = {
    //   id: textEncoder.encode(email),
    //   name: email,
    //   displayName: email,
    // };

    console.log('publicKey: ', publicKey);

    const PublicKeyCredentials = await navigator.credentials.get({
      publicKey,
    });

    console.log('PublicKeyCredentials: ', PublicKeyCredentials);

    const authenticatorData = window.btoa(
      String.fromCharCode(
        ...new Uint8Array(PublicKeyCredentials.response.authenticatorData),
      ),
    );

    const signature = window.btoa(
      String.fromCharCode(
        ...new Uint8Array(PublicKeyCredentials.response.signature),
      ),
    );

    const userHandle = window.btoa(
      String.fromCharCode(
        ...new Uint8Array(PublicKeyCredentials.response.userHandle),
      ) || email,
    );

    const clientDataJSON = window.btoa(
      String.fromCharCode(
        ...new Uint8Array(PublicKeyCredentials.response.clientDataJSON),
      ),
    );

    const id = window.btoa(
      String.fromCharCode(...new Uint8Array(PublicKeyCredentials.rawId)),
    );

    return {
      requestId: publicKey.requestId,
      id,
      response: {
        clientDataJSON,
        authenticatorData,
        signature,
        userHandle,
      },
    };
  };
  return { generateLoginCredentials };
};

export default useGenerateLoginCredentials;
