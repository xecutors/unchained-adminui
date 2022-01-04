import cookie from 'cookie';
import { ApolloClient, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries';
import { sha256 } from 'crypto-hash';
import { onTokenChange } from '../../auth/utils/store';
import getConfig from 'next/config';


const { publicRuntimeConfig } = getConfig() || {};
import apolloCache, {resetCache} from './apolloCach';
console.log(process.env.GRAPHQL_ENDPOINT)
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

const getApolloClient = ({ headers = {}, locale }) => {
  const browserFallback =
    process.browser && `${window.location.origin}/graphql`;
 

  const localeLink = setContext((_, { headers: contextHeaders = {} }) => {
    return setLocale({ ...headers, ...contextHeaders }, locale);
  });

  const persistedQueryLink = createPersistedQueryLink({
    sha256,
    useGETForHashedQueries: true,
  });

  const fallback =
    headers && headers.host
      ? `http://${headers.host}/graphql`
      : browserFallback;
  const httpLink = createUploadLink({
    uri: publicRuntimeConfig.GRAPHQL_ENDPOINT || fallback,
    credentials: 'same-origin',
  });

  const cache = apolloCache(locale);
  const apolloClient = new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from([persistedQueryLink, localeLink, httpLink]),
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
