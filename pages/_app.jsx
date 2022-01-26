import { ApolloProvider } from '@apollo/client';

import App from 'next/app';

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useApollo } from '../modules/apollo/apolloClient';
import '../styles/globals.css';

import 'react-datepicker/dist/react-datepicker.min.css';
import getMessages from '../modules/i18n/utils/getMessages';
import IntlWrapper from '../modules/i18n/components/IntlWrapper';
import Layout from '../modules/common/components/Layout';
import { CurrentUserQuery } from '../modules/accounts/hooks/useCurrentUser';
import { UnrestrictedPages } from '../modules/common/data/miscellaneous';

const isReportUI = parseInt(process.env.NEXT_PUBLIC_SHOW_CONTROL_PANEL, 10);

const UnchainedAdmin = ({ Component, pageProps, isLoggedIn, ...rest }) => {
  const router = useRouter();

  const { locale } = router;

  const apollo = useApollo(pageProps, { locale });

  useEffect(() => {
    (async () => {
      const { data } = await apollo.query({
        query: CurrentUserQuery,
        errorPolicy: 'none',
        fetchPolicy: 'network-only',
      });
      if (!data?.me && !UnrestrictedPages.includes(router.pathname))
        router.push('/log-in');
    })();
  }, [router.pathname]);

  let getLayout;

  if (Component.getLayout) getLayout = Component.getLayout;
  else if (!isReportUI)
    getLayout = (page) => (
      <Layout apollo={apollo} {...rest} navigationType="report">
        {page}
      </Layout>
    );
  else
    getLayout = (page) => (
      <Layout apollo={apollo} {...rest} navigationType="default">
        {page}
      </Layout>
    );

  const messages = getMessages(router.locale);

  return (
    <ApolloProvider client={apollo}>
      <IntlWrapper
        locale={router.locale}
        messages={messages}
        key="intl-provider"
      >
        {getLayout(<Component {...pageProps} />)}
      </IntlWrapper>
    </ApolloProvider>
  );
};
UnchainedAdmin.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};
export default UnchainedAdmin;
