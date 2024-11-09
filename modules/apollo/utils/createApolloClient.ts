import {
  ApolloClient,
  ApolloLink,
  NormalizedCacheObject,
} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import getConfig from 'next/config';
import { onTokenChange, getLoginToken } from '../../accounts/utils/store';
import apolloCache, { resetCache } from './apolloCache';

const {
  publicRuntimeConfig: { allowEndpointSwitch, publicGraphQLEndpoint },
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
        return allowedHeaders.includes(key?.toLowerCase());
      }),
    ),
    'accept-language': headers?.forceLocale || locale,
  };
  return { headers: newHeaders };
};

const resolveUri = (endpointInSession) => {
  if (typeof window !== 'undefined') {
    if (allowEndpointSwitch && endpointInSession) return endpointInSession; // use user-selected endpoint
    if (publicGraphQLEndpoint) return publicGraphQLEndpoint; // use pre-set public endpoint
    return `${window.location.origin}/api/graphql`; // use the proxy that moves calls to GRAPHQL_ENDPOINT
  }
  // server side is direct (without using the proxy in next)
  return process.env.GRAPHQL_ENDPOINT;
};

const createApolloClient = ({
  headers: headersOverride = {},
  locale,
  endpoint,
}): ApolloClient<NormalizedCacheObject> => {
  const localeLink = setContext((_, { headers: contextHeaders = {} }) => {
    return setLocale({ ...headersOverride, ...contextHeaders }, locale);
  });
  const authLink = new ApolloLink((operation, forward) => {
    const context = operation.getContext();
    const headers: { authorization?: string } = {};

    const foundToken = getLoginToken();
    if (foundToken) {
      headers.authorization = `Bearer ${foundToken}`;
    }

    operation.setContext({
      headers: {
        ...(context?.headers || {}),
        ...headers,
      },
    });
    return forward(operation);
  });

  const uri = resolveUri(endpoint);
  const httpLink = createUploadLink({
    uri,
    credentials: 'same-origin',
    includeExtensions: true,
    headers: {
      'apollo-require-preflight': true,
      'x-unchained-bust-cache': true,
    },
  });

  const errorLink = onError(({ response, graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      response?.errors.concat(graphQLErrors);
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
      console.error(`[Network error]: ${networkError}`); // eslint-disable-line
    }
  });

  const cache = apolloCache(locale);

  const apolloClient = new ApolloClient({
    connectToDevTools: typeof window !== 'undefined',
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'ignore',
      },
    },
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from(
      [authLink, errorLink, localeLink, httpLink].filter(Boolean),
    ),

    cache,
  });

  apolloClient.onResetStore(async () => {
    resetCache(cache);
  });

  onTokenChange(() => {
    apolloClient.resetStore();
  });

  return apolloClient;
};

export default createApolloClient;
