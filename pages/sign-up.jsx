import { useRouter } from 'next/router';
import SignUpForm from '../modules/accounts/components/Signup';
import useCreateUser from '../modules/accounts/hooks/useCreateUser';
import { storeLoginToken } from '../modules/accounts/utils/store';
import {
  addApolloState,
  initializeApollo,
} from '../modules/apollo/apolloClient';
import useAuth from '../modules/Auth/useAuth';

const SignUpPage = () => {
  const { push } = useRouter();
  const { createUser } = useCreateUser();
  const { setAuthContext } = useAuth();

  const onSubmit = async ({ email, password, username }) => {
    const { data } = await createUser({
      username,
      email,
      password,
      disableHashing: true,
    });
    const { id, token, tokenExpires, user } = data.createUser;
    await storeLoginToken(id, token, new Date(tokenExpires));
    setAuthContext(id, user?.allowedActions);
    return true;
  };

  const onSubmitSuccess = () => {
    push('/account');
  };
  return <SignUpForm onSubmit={onSubmit} onSubmitSuccess={onSubmitSuccess} />;
};

export async function getStaticProps({ locale }) {
  const apolloClient = await initializeApollo(null, { locale });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 3600,
  });
}

export default SignUpPage;

SignUpPage.getLayout = (page) => page;
