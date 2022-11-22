import { useRouter } from 'next/router';
import { useState } from 'react';
import SignUpForm from '../modules/accounts/components/Signup';
import useCreateUser from '../modules/accounts/hooks/useCreateUser';
import { storeLoginToken } from '../modules/accounts/utils/store';

const SignUpPage = () => {
  const { push } = useRouter();
  const { createUser } = useCreateUser();
  const [authenticateWithDevice, setAuthenticateWithDevice] = useState(true);
  const onSubmit = async ({ email, password }) => {
    const { data } = await createUser({
      email,
      password,
    });
    const { id, token, tokenExpires } = data.createUser;
    await storeLoginToken(id, token, new Date(tokenExpires));

    return true;
  };

  const onSubmitSuccess = () => {
    push('/account');
  };
  return (
    <SignUpForm
      onSubmit={onSubmit}
      onSubmitSuccess={onSubmitSuccess}
      authenticateWithDevice={authenticateWithDevice}
      onAuthenticateWithDeviceChange={setAuthenticateWithDevice}
    />
  );
};

export default SignUpPage;

SignUpPage.getLayout = (page) => page;
