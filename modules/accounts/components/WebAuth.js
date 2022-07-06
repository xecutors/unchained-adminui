import React from 'react';
import { useIntl } from 'react-intl';
import FormWrapper from '../../common/components/FormWrapper';
import EmailField from '../../forms/components/EmailField';
import Form from '../../forms/components/Form';
import SubmitButton from '../../forms/components/SubmitButton';
import useForm from '../../forms/hooks/useForm';
import useCreateUser from '../hooks/useCreateUser';
import useCreateUserWithWebAuth from '../hooks/useCreateUserWithWebAuth';
import useWebAuth from '../hooks/useWebAuth';
import { storeLoginToken } from '../utils/store';

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
  const { createWebAuth } = useWebAuth();
  const { createUserWithWebAuth } = useCreateUserWithWebAuth();

  const onSubmit = async ({ authEmail }) => {
    const { data } = await createWebAuth({
      username: authEmail,
    });

    const { createWebAuthnCredentialCreationOptions: publicKey } = data;

    const textEncoder = new TextEncoder('utf-8');
    publicKey.challenge = base64ToArrayBuffer(publicKey.challenge);
    publicKey.user = {
      id: textEncoder.encode(authEmail),
      name: authEmail,
      displayName: authEmail,
    };

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

    const webAuthnPublicKeyCredentials = {
      id: rawId,
      response: {
        clientDataJSON,
        attestationObject,
      },
    };

    const result = await createUserWithWebAuth({
      email: authEmail,
      webAuthnPublicKeyCredentials,
    });
    const { id, token, tokenExpires } = result?.data?.createUser;
    await storeLoginToken(id, token, new Date(tokenExpires));

    console.log('Public Credentials: ', webAuthnPublicKeyCredentials);
    // console.log('new user: ', id, token, tokenExpires);
    console.log('new user: ', result);

    // return true;

    // return createUser({
    //   email,
    //   password,
    //   username,
    //   disableHashing: true,
    //   webAuthnPublicKeyCredentials,
    // });
  };

  const form = useForm({
    submit: onSubmit,
    initialValues: {
      authEmail: null,
    },
  });

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
      <Form form={form}>
        <div>
          <EmailField
            id="authEmail"
            name="authEmail"
            className="mt-1"
            type="email"
            autoComplete="email"
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
          <SubmitButton
            className="flex-auto capitalize"
            label={formatMessage({
              id: 'register',
              defaultMessage: 'register',
            })}
          />
          <SubmitButton
            className="flex-auto capitalize"
            label={formatMessage({
              id: 'login',
              defaultMessage: 'login',
            })}
          />
        </div>
      </Form>
    </FormWrapper>
  );
};

export default WebAuth;
