import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import apolloCache from './apolloCache';

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

const resolveUri = () => {
  if (typeof window !== 'undefined') {
    return (
      process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
      `${window.location.origin}/graphql`
    );
  }
  return process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
};

const createApolloClient = ({
  headers: headersOverride = {},
  locale,
}): ApolloClient<NormalizedCacheObject> => {
  const localeLink = setContext((_, { headers: contextHeaders = {} }) => {
    return setLocale({ ...headersOverride, ...contextHeaders }, locale);
  });

  const uri = resolveUri();

  const httpLink = new HttpLink({
    uri,
    credentials: 'include',
    includeExtensions: true,
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
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'ignore',
      },
    },
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from([errorLink, localeLink, httpLink].filter(Boolean)),
    cache,
  });

  return apolloClient;
};

export default createApolloClient;
