import { ApolloProvider } from '@apollo/client';
import cookie from 'cookie';

import App from 'next/app';

import { useApollo } from '../modules/apollo/apolloClient';
import '../styles/globals.css';

export function parseCookies(ctx = {}, options = {}) {
  return cookie.parse(
    ctx.req && ctx.req.headers && ctx.req.headers.cookie // eslint-disable-line
      ? ctx.req.headers.cookie
      : process.browser
      ? document.cookie
      : '',
    options,
  );
}

const UnchainedAdmin = ({ Component, pageProps, ...rest }) => {
  const apollo = useApollo(pageProps, { locale: 'de' });

  return (
    <ApolloProvider client={apollo}>
      <Component {...pageProps} {...rest} apollo={apollo} />
    </ApolloProvider>
  );
};
UnchainedAdmin.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps, isLoggedIn: !!parseCookies(appContext.ctx).token };
};
export default UnchainedAdmin;
