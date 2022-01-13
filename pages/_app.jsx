import { ApolloProvider } from '@apollo/client';
import cookie from 'cookie';

import App from 'next/app';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useApollo } from '../modules/apollo/apolloClient';
import '../styles/globals.css';
import LogInPage from './log-in';
import logOut from '../modules/accounts/hooks/logOut';
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

const Icons = ({ url }) => {
  return (
    <svg
      className="text-gray-500 mr-4 flex-shrink-0 h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d={url}
      />
    </svg>
  );
};

const sidenavItems = [
  {
    title: 'Sync Status',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    path: '/',
  },
  {
    title: 'Users',
    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    path: '/users',
  },
  {
    title: 'Countries',
    icon: 'M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9',
    path: '/countries',
  },
  {
    title: 'Languages',
    icon: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129',
    path: '/languages',
  },
  {
    title: 'Currencies',
    icon: 'M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z',
    path: '/currencies',
  },
  {
    title: 'Payments',
    icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
    path: '/payments',
  },
  {
    title: 'Delivery',
    icon: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z',
    path: 'deliveries',
  },
  {
    title: 'Warehousing',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    path: '/warehousing',
  },
  {
    title: 'Logs',
    icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    path: '/logs',
  },
];

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
