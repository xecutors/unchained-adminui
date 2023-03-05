import { ApolloProvider } from '@apollo/client';
import App from 'next/app';

import { Router, useRouter } from 'next/router';

import { ToastContainer } from 'react-toastify';
import React, { useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';

import { initializeApollo, useApollo } from '../modules/apollo/apolloClient';
import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.min.css';
import getMessages from '../modules/i18n/utils/getMessages';
import IntlWrapper from '../modules/i18n/components/IntlWrapper';
import Layout from '../modules/common/components/Layout';

import ModalWrapper from '../modules/modal/components/ModalWrapper';
import AuthWrapper from '../modules/Auth/AuthWrapper';
import {
  EndpointContext,
  useSetEndpointContext,
} from '../modules/apollo/EndpointWrapper';
import ThemeWrapper from '../modules/common/components/ThemeWrapper';
import * as matomo from '../modules/common/utils/matomo';
import { GetCurrentUserQuery } from '../modules/accounts/hooks/useCurrentUser';
import ThemeToggle from '../modules/common/components/ThemeToggle';
import UnchainedContextWrapper from '../modules/UnchainedContext/UnchainedContextWrapper';
import formatUsername from '../modules/common/utils/formatUsername';

const handleRouteChange = async (url) => {
  const apolloClient = initializeApollo();
  const { data: { me } = {} } = await apolloClient.query({
    query: GetCurrentUserQuery(),
    errorPolicy: 'none',
    fetchPolicy: 'cache-first',
  });

  const emailAddress = me?.primaryEmail?.address;
  const username = formatUsername(me);
  const clientId = me?._id;

  matomo.pageView(document.location.origin + url, document.title, {
    username,
    emailAddress,
    clientId,
  });
};

const UnchainedAdmin = ({ Component, componentName, pageProps, ...rest }) => {
  const router = useRouter();
  const endpointContext = useSetEndpointContext();
  const { locale } = router;

  const apollo = useApollo(pageProps, {
    locale,
    endpoint: endpointContext.endpoint,
  });

  const getLayout = Component.getLayout
    ? (page) => (
        <>
          <div className="absolute top-4 right-4">
            <ThemeToggle />
          </div>
          {Component.getLayout(page)}
        </>
      )
    : (page) => (
        <Layout apollo={apollo} {...rest}>
          {page}
        </Layout>
      );

  const messages = getMessages(router.locale);

  useEffect(() => {
    Router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
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
      <EndpointContext.Provider value={endpointContext}>
        <ApolloProvider client={apollo}>
          <IntlWrapper
            locale={router.locale}
            messages={messages}
            key="intl-provider"
          >
            <AuthWrapper apolloClient={apollo} componentName={componentName}>
              <UnchainedContextWrapper>
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
              </UnchainedContextWrapper>
            </AuthWrapper>
          </IntlWrapper>
        </ApolloProvider>
      </EndpointContext.Provider>
    </>
  );
};

UnchainedAdmin.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);

  const componentName =
    appContext.Component.displayName || appContext.Component.name || 'Unknown';
  return { ...appProps, componentName };
};

export default UnchainedAdmin;
