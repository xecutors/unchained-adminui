import { ApolloProvider } from '@apollo/client';
import 'react-quill/dist/quill.snow.css';
import App from 'next/app';

import { Router, useRouter } from 'next/router';

import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { useApollo } from '../modules/apollo/apolloClient';
import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.min.css';
import getMessages from '../modules/i18n/utils/getMessages';
import IntlWrapper from '../modules/i18n/components/IntlWrapper';
import Layout from '../modules/common/components/Layout';

import ModalWrapper from '../modules/modal/components/ModalWrapper';
import AuthWrapper from '../modules/Auth/AuthWrapper';
import ThemeWrapper from '../modules/common/components/ThemeWrapper';
import * as matomo from '../modules/common/utils/matomo';
import { CurrentUserQuery } from '../modules/accounts/hooks/useCurrentUser';

const handleRouteChange = (apolloClient) => async (url) => {
  const { data: { me } = {} } = await apolloClient.query({
    query: CurrentUserQuery,
    errorPolicy: 'none',
    fetchPolicy: 'cache-first',
  });

  const emailAddress = me?.primaryEmail?.address;
  const username = me?.username;
  const clientId = me?._id;

  matomo.pageView(document.location.origin + url, document.title, {
    username,
    emailAddress,
    clientId,
  });
};

const UnchainedAdmin = ({ Component, pageProps, ...rest }) => {
  const router = useRouter();
  const { locale } = router;

  const endpoint = router.query?.endpoint;

  const apollo = useApollo(pageProps, { locale, endpoint });

  const getLayout =
    Component.getLayout ||
    ((page) => (
      <Layout apollo={apollo} {...rest}>
        {page}
      </Layout>
    ));

  const messages = getMessages(router.locale);

  useEffect(() => {
    Router.events.on('routeChangeComplete', handleRouteChange(apollo));

    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange(apollo));
    };
  }, [apollo]);

  return (
    <>
      <Head>
        {process.env.NEXT_PUBLIC_MATOMO_SITE_ID ? (
          <>
            <Script
              id="matomo-script"
              src={`${process.env.NEXT_PUBLIC_MATOMO_URL}/matomo.js`}
            />
            <Script
              id="matomo-config"
              dangerouslySetInnerHTML={{
                __html: `
  var _paq = window._paq = window._paq || [];
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  _paq.push(['setTrackerUrl', '${process.env.NEXT_PUBLIC_MATOMO_URL}/matomo.php']);
  _paq.push(['setSiteId', '${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}']);
  `,
              }}
            />
          </>
        ) : null}
      </Head>
      <ApolloProvider client={apollo}>
        <IntlWrapper
          locale={router.locale}
          messages={messages}
          key="intl-provider"
        >
          <AuthWrapper>
            <ThemeWrapper>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
              <ModalWrapper>
                {getLayout(<Component {...pageProps} />)}
              </ModalWrapper>
            </ThemeWrapper>
          </AuthWrapper>
        </IntlWrapper>
      </ApolloProvider>
    </>
  );
};

UnchainedAdmin.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default UnchainedAdmin;
