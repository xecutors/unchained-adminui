import { useRouter } from 'next/router';
import { useState } from 'react';
import SignUpForm from '../modules/accounts/components/SignUpForm';
import useCreateUser from '../modules/accounts/hooks/useCreateUser';
import useGenerateWebAuthCredentials from '../modules/accounts/hooks/useGenerateWebAuthCredentials';
import { OnSubmitSuccessType } from '../modules/forms/hooks/useForm';

const SignUpPage = () => {
  const { push } = useRouter();
  const { createUser } = useCreateUser();
  const [authenticateWithDevice, setAuthenticateWithDevice] = useState(true);
  const { generateWebAuthCredentials } = useGenerateWebAuthCredentials();
  const registerWithWebAuth = async (username) => {
    const webAuthnPublicKeyCredentials = await generateWebAuthCredentials({
      username,
    });

    const { data } = await createUser({
      username,
      webAuthnPublicKeyCredentials,
    });

    return data;
  };

  const onSubmit = async (variables) => {
    const { username, email, plainPassword } = variables;
    if (authenticateWithDevice) {
      await registerWithWebAuth(username);
      return { success: true };
    }

    const { data } = await createUser({
      username,
      email,
      plainPassword,
    });
    const { _id } = data.createUser;
    if (_id) return { success: true };
    return { success: false, data };
  };

  const onSubmitSuccess: OnSubmitSuccessType = () => {
    push('/account');
    return true;
  };

  return (
    <SignUpForm
      onSubmit={onSubmit}
      onSubmitSuccess={onSubmitSuccess}
      authenticateWithDevice={authenticateWithDevice}
      onAuthenticateWithDeviceChange={() =>
        setAuthenticateWithDevice(!authenticateWithDevice)
      }
    />
  );
};

export default SignUpPage;

SignUpPage.getLayout = (page) => page;
