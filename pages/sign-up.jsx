import { useRouter } from 'next/router';
import SignUpForm from '../modules/accounts/components/Signup';
import useCreateUser from '../modules/accounts/hooks/useCreateUser';
import { storeLoginToken } from '../modules/accounts/utils/store';
import {
  addApolloState,
  initializeApollo,
} from '../modules/apollo/apolloClient';

const SignUpPage = () => {
  const { push } = useRouter();
  const { createUser } = useCreateUser();

  const onSubmit = async ({ email, password }) => {
    const { data } = await createUser({
      email,
      password,
      disableHashing: true,
    });
    const { id, token, tokenExpires } = data.createUser;
    await storeLoginToken(id, token, new Date(tokenExpires));
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
