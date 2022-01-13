import { ApolloProvider } from '@apollo/client';
import cookie from 'cookie';

import App from 'next/app';

import { useRouter } from 'next/router';
import { useApollo } from '../modules/apollo/apolloClient';
import '../styles/globals.css';

import getMessages from '../modules/i18n/utils/getMessages';
import IntlWrapper from '../modules/i18n/components/IntlWrapper';

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
  const router = useRouter();
  const { locale } = router;

  const apollo = useApollo(pageProps, { locale });

  const messages = getMessages(router.locale);

  return (
    <ApolloProvider client={apollo}>
      <IntlWrapper
        locale={router.locale}
        messages={messages}
        key="intl-provider"
      >
        <Component {...pageProps} {...rest} apollo={apollo} />
      </IntlWrapper>
    </ApolloProvider>
  );
};
UnchainedAdmin.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps, isLoggedIn: !!parseCookies(appContext.ctx).token };
};
export default UnchainedAdmin;
