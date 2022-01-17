import { useRouter } from 'next/router';
import SignupForm from '../modules/accounts/components/Signup';
import useCreateUser from '../modules/accounts/hooks/useCreateUser';
import { storeLoginToken } from '../modules/accounts/utils/store';

const SignUpPage = () => {
  const { push } = useRouter();
  const { createUser } = useCreateUser();

  const onSubmit = async ({ email, password, username }) => {
    const { data } = await createUser({
      username,
      email,
      password,
      disableHashing: true,
    });
    const { id, token, tokenExpires } = data.createUser;
    await storeLoginToken(id, token, new Date(tokenExpires));
    return true;
  };

  const onSubmitSuccess = () => {
    push('/');
  };
  return <SignupForm onSubmit={onSubmit} onSubmitSuccess={onSubmitSuccess} />;
};

export default SignUpPage;
