import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import Button from '../../common/components/Button';
import FormWrapper from '../../common/components/FormWrapper';

import useCreateWebAuthnCredentialRequestOptions from '../hooks/useCreateWebAuthnCredentialRequestOptions';
import useLoginWithWebAuthn from '../hooks/useLoginWithWebAuthn';
import useCreateWebAuthnCredentialCreationOptions from '../hooks/useCreateWebAuthnCredentialCreationOptions';
import { storeLoginToken } from '../utils/store';
import useCreateUser from '../hooks/useCreateUser';

const base64ToArrayBuffer = (b64) => {
  const binaryString = window.atob(b64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i += 1) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};

const WebAuth = () => {
  const { formatMessage } = useIntl();
  const { createWebAuthnCredentialCreationOptions } =
    useCreateWebAuthnCredentialCreationOptions();
  const { createUser } = useCreateUser();
  const { loginWithWebAuthn } = useLoginWithWebAuthn();
  const [userEmail, setUserEmail] = useState();
  const { createWebAuthnCredentialRequestOptions: createAuthReq } =
    useCreateWebAuthnCredentialRequestOptions();

  const generateLoginCredentials = async () => {
    const { data } = await createAuthReq({
      username: userEmail,
    });

    const { createWebAuthnCredentialRequestOptions } = data;

    const publicKey = createWebAuthnCredentialRequestOptions;
    publicKey.challenge = base64ToArrayBuffer(publicKey.challenge);

    publicKey.allowCredentials = publicKey.allowCredentials?.map(
      ({ id, ...rest }) => ({
        id: base64ToArrayBuffer(id),
        ...rest,
      }),
    );
    const textEncoder = new TextEncoder('utf-8');

    publicKey.user = {
      id: textEncoder.encode(userEmail),
      name: userEmail,
      displayName: userEmail,
    };

    const PublicKeyCredentials = await navigator.credentials.get({
      publicKey,
    });

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
      ) || userEmail,
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

  const generateWebAuthPublicKey = async (email) => {
    const { data } = await createWebAuthnCredentialCreationOptions({
      username: email,
    });

    const { createWebAuthnCredentialCreationOptions: publicKey } = data;

    const textEncoder = new TextEncoder('utf-8');
    publicKey.challenge = base64ToArrayBuffer(publicKey.challenge);
    publicKey.user = {
      id: textEncoder.encode(email),
      name: email,
      displayName: email,
    };
    console.log(publicKey);
    const publicKeyCredentials = await navigator.credentials.create({
      publicKey,
    });

    const attestationObject = window.btoa(
      String.fromCharCode(
        ...new Uint8Array(publicKeyCredentials.response.attestationObject),
      ),
    );
    const clientDataJSON = window.btoa(
      String.fromCharCode(
        ...new Uint8Array(publicKeyCredentials.response.clientDataJSON),
      ),
    );
    const rawId = window.btoa(
      String.fromCharCode(...new Uint8Array(publicKeyCredentials.rawId)),
    );

    return {
      id: rawId,
      response: {
        clientDataJSON,
        attestationObject,
      },
    };
  };
  const onSubmit = async () => {
    try {
      console.log('user email ', userEmail);
      const webAuthnPublicKeyCredentials = await generateWebAuthPublicKey(
        userEmail,
      );
      console.log(' after user email ', userEmail);
      const { data } = await createUser({
        email: userEmail,
        webAuthnPublicKeyCredentials,
        disableHashing: true,
      });
      console.log(' after create user ', userEmail);
      const { id, token, tokenExpires } = data?.createUser;
      await storeLoginToken(id, token, new Date(tokenExpires));
    } catch (e) {
      alert(e.message);
    }
  };
  const logInWithWebAuth = async () => {
    try {
      const webAuthnPublicKeyCredentials = await generateLoginCredentials();
      await loginWithWebAuthn({ webAuthnPublicKeyCredentials });
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <FormWrapper className="py-4 px-4">
      <div>
        <h3>
          {formatMessage({
            id: 'web_auth',
            defaultMessage: 'Web Authentication',
          })}
        </h3>
      </div>

      <div>
        <input
          id="authEmail"
          name="authEmail"
          className="mt-1"
          onChange={(e) => setUserEmail(e.target.value)}
          required
          labelClassName="capitalize"
          label={formatMessage({
            id: 'user_name',
            defaultMessage: 'user name',
          })}
          placeholder={formatMessage({
            id: 'email',
            defaultMessage: 'User name or Email',
          })}
        />
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={onSubmit}
          disabled={!userEmail}
          className="flex-auto capitalize"
          text={formatMessage({
            id: 'register',
            defaultMessage: 'register',
          })}
        />
        <Button
          onClick={logInWithWebAuth}
          disabled={!userEmail}
          className="flex-auto capitalize"
          text={formatMessage({
            id: 'login',
            defaultMessage: 'login',
          })}
        />
      </div>
    </FormWrapper>
  );
};

export default WebAuth;
