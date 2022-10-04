import { ApolloClient, ApolloLink } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import getConfig from 'next/config';
import { onTokenChange, getLoginToken } from '../../accounts/utils/store';
import apolloCache, { resetCache } from './apolloCache';

const {
  publicRuntimeConfig: { allowEndpointSwitch },
} = getConfig();

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

const getLocalURI = () => {
  return process.browser
    ? `${window.location.origin}/api/graphql`
    : process.env.GRAPHQL_ENDPOINT;
};

const getNormalizeURI = (endpoint) => {
  if (allowEndpointSwitch) {
    return endpoint;
  }
  return getLocalURI();
};

const getApolloClient = ({
  headers: headersOverride = {},
  locale,
  endpoint,
}) => {
  const localeLink = setContext((_, { headers: contextHeaders = {} }) => {
    return setLocale({ ...headersOverride, ...contextHeaders }, locale);
  });
  const authLink = new ApolloLink((operation, forward) => {
    const headers = {};

    const foundToken = getLoginToken();
    if (foundToken) {
      headers.authorization = `Bearer ${foundToken}`;
    }

    operation.setContext({ headers });
    return forward(operation);
  });

  const httpLink = createUploadLink({
    uri: getNormalizeURI(endpoint),
    credentials: 'same-origin',
    includeExtensions: true,
  });

  const errorLink = onError(({ response, graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      response?.errors?.push(...graphQLErrors);
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
    connectToDevTools: typeof window !== 'undefined',
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'ignore',
      },
    },
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from(
      [authLink, errorLink, localeLink, httpLink].filter(Boolean),
    ),

    cache,
  });

  apolloClient.onResetStore(() => {
    resetCache(cache);
  });

  onTokenChange(() => {
    apolloClient.resetStore();
  });

  return apolloClient;
};

export default getApolloClient;
