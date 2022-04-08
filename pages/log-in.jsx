import LogIn from '../modules/accounts/components/Login';
import {
  addApolloState,
  initializeApollo,
} from '../modules/apollo/apolloClient';

const LogInPage = () => {
  return <LogIn />;
};

export async function getStaticProps({ locale }) {
  const apolloClient = await initializeApollo(null, { locale });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 3600,
  });
}

export default LogInPage;

LogInPage.getLayout = (page) => page;
