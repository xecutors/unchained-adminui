import cookie from 'cookie';
import { ApolloClient, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries';
import { sha256 } from 'crypto-hash';
import getConfig from 'next/config';
import { onError } from '@apollo/client/link/error';
import { onTokenChange } from '../../accounts/utils/store';
import apolloCache, { resetCache } from './apolloCach';

const { publicRuntimeConfig } = getConfig() || {};

const allowedHeaders = [
  'accept-language',
  'pragma',
  'user-agent',
  'x-forwarded-for',
  'x-forwarded-host',
  'x-forwarded-port',
  'x-forwarded-proto',
  'x-forwarded-server',
  'x-mapihttpcapability',
  'x-real-ip',
  'x-user-identity',
  'host',
  'cookie',
  'authorization',
];

const setLocale = (headers, locale) => {
  const newHeaders = {
    ...Object.fromEntries(
      Object.entries(headers).filter(([key]) => {
        return allowedHeaders.includes(key.toLowerCase());
      }),
    ),
    'accept-language': locale,
  };
  return { headers: newHeaders };
};

function parseCookies(ctx = {}, options = {}) {
  return cookie.parse(
    ctx.req && ctx.req.headers && ctx.req.headers.cookie // eslint-disable-line
      ? ctx.req.headers.cookie
      : process.browser
      ? document.cookie
      : '',
    options,
  );
}

const getApolloClient = ({ headers: headersOverride = {}, locale }) => {
  const browserFallback =
    process.browser && `${window.location.origin}/graphql`;

  const middlewareLink = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    const headers = {};
    if (headersOverride && headersOverride['accept-language']) {
      headers['accept-language'] = headersOverride['accept-language'];
    }
    headers.authorization = parseCookies({}).token
      ? `Bearer ${parseCookies({}).token}`
      : null;
    operation.setContext({ headers });
    return forward(operation);
  });

  const fallback =
    headersOverride && headersOverride.host
      ? `http://${headers.host}/graphql`
      : browserFallback;
  const httpLink = createUploadLink({
    uri: publicRuntimeConfig.GRAPHQL_ENDPOINT || fallback,
    credentials: 'same-origin',
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.log(
          // eslint-disable-line
          `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
            locations,
          )}, Path: ${path}`,
        );
      });
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`); // eslint-disable-line
    }
  });

  const cache = apolloCache(locale);
  const apolloClient = new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from([middlewareLink, errorLink, httpLink]),
    assumeImmutableResults: true,
    cache,
  });

  apolloClient.onResetStore(() => {
    resetCache(cache);
  });

  onTokenChange(({ token, tokenExpires }) => {
    if (!token || !tokenExpires) {
      document.cookie = cookie.serialize('token', '', {
        maxAge: -1, // Expire the cookie immediately
      });
      document.cookie = cookie.serialize('token', '', {
        maxAge: -1, // Expire the cookie immediately
        path: '/',
      });
      console.debug('token removed from cookies'); // eslint-disable-line
      apolloClient.resetStore();
      return;
    }

    const maxAge =
      ((new Date().getTime() - new Date(tokenExpires).getTime()) * -1) / 1000;

    const newCookie = cookie.serialize('token', token, {
      maxAge,
      path: '/',
      secure: window.location.protocol === 'https',
      sameSite: true,
    });
    document.cookie = newCookie;
    console.debug('token added to cookies, expiring: ', maxAge); // eslint-disable-line
    apolloClient.resetStore();
  });

  return apolloClient;
};

export default getApolloClient;
