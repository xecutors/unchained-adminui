import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import Button from '../../common/components/Button';
import FormWrapper from '../../common/components/FormWrapper';
import useLoginWithWebAuthn from '../hooks/useLoginWithWebAuthn';
import { storeLoginToken } from '../utils/store';
import useCreateUser from '../hooks/useCreateUser';
import useGenerateWebAuthCredentials from '../hooks/useGenerateWebAuthCredentials';
import useGenerateLoginCredentials from '../hooks/useGenerateLoginCredentials';

const WebAuthAuthenticator = () => {
  const { formatMessage } = useIntl();
  const [userEmail, setUserEmail] = useState();
  const { createUser } = useCreateUser();
  const { loginWithWebAuthn } = useLoginWithWebAuthn();
  const { generateWebAuthCredentials } = useGenerateWebAuthCredentials();
  const { generateLoginCredentials } = useGenerateLoginCredentials();

  const registerWithWebAuth = async () => {
    try {
      const webAuthnPublicKeyCredentials = await generateWebAuthCredentials({
        email: userEmail,
      });

      const { data } = await createUser({
        email: userEmail,
        webAuthnPublicKeyCredentials,
        disableHashing: true,
      });

      const { id, token, tokenExpires } = data?.createUser;
      await storeLoginToken(id, token, new Date(tokenExpires));
    } catch (e) {
      alert(e.message);
    }
  };

  const logInWithWebAuth = async () => {
    try {
      const webAuthnPublicKeyCredentials = await generateLoginCredentials({
        email: userEmail,
      });
      console.log('webAuthnPublicKeyCredentials', webAuthnPublicKeyCredentials);
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

      <div className="mt-1">
        <input
          id="authEmail"
          name="authEmail"
          className="relative mt-1 block w-full dark:placeholder:text-white dark:bg-slate-600 dark:text-white appearance-none rounded-md border-2 border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-sm placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400'"
          onChange={(e) => setUserEmail(e.target.value)}
          required
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
          onClick={registerWithWebAuth}
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

export default WebAuthAuthenticator;
