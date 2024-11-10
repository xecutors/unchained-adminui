import { ApolloProvider } from '@apollo/client';
import App from 'next/app';
import { Router } from 'next/router';
import { ToastContainer } from 'react-toastify';
import React, { useEffect } from 'react';
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
import {
  EndpointContext,
  useSetEndpointContext,
} from '../modules/apollo/EndpointWrapper';
import ThemeWrapper from '../modules/common/components/ThemeWrapper';
import * as matomo from '../modules/common/utils/matomo';
import ThemeToggle from '../modules/common/components/ThemeToggle';
import UnchainedContextWrapper from '../modules/UnchainedContext/UnchainedContextWrapper';
import ErrorBoundary from '../modules/common/components/ErrorBoundary';

const handleRouteChange = (url) => {
  matomo.pageView(document.location.origin + url, document.title);
};

const UnchainedAdmin = ({ Component, componentName, pageProps, router }) => {
  const endpointContext = useSetEndpointContext();

  const apollo = useApollo(pageProps, {
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
        <Layout apollo={apollo} router={router}>
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
    <IntlWrapper locale={router.locale} messages={messages} key="intl-provider">
      <ErrorBoundary>
        <Head>
          <title>Unchained: Admin UI</title>
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
                  <AuthWrapper
                    apolloClient={apollo}
                    componentName={componentName}
                  >
                    {getLayout(<Component {...pageProps} />)}
                  </AuthWrapper>
                </ModalWrapper>
              </ThemeWrapper>
            </UnchainedContextWrapper>
          </ApolloProvider>
        </EndpointContext.Provider>
      </ErrorBoundary>
    </IntlWrapper>
  );
};

UnchainedAdmin.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);

  const componentName =
    appContext.Component.displayName || appContext.Component.name || 'Unknown';
  return { ...appProps, componentName };
};

export default UnchainedAdmin;
