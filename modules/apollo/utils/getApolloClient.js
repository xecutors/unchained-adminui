import { ApolloClient, ApolloLink } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from '@apollo/client/link/error';
import { onTokenChange, getLoginToken } from '../../accounts/utils/store';
import apolloCache, { resetCache } from './apolloCache';

const getApolloClient = ({
  headers: headersOverride = {},
  locale,
  endpoint,
}) => {
  const middlewareLink = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    const headers = {};
    if (headersOverride && headersOverride['accept-language']) {
      headers['accept-language'] = headersOverride['accept-language'];
    }
    const foundToken = getLoginToken();
    if (foundToken) {
      headers.authorization = `Bearer ${foundToken}`;
    }

    operation.setContext({ headers });
    return forward(operation);
  });

  const httpLink = createUploadLink({
    uri: endpoint,
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
    link: ApolloLink.from([middlewareLink, errorLink, httpLink]),

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
