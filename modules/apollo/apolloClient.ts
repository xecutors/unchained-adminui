import { useMemo } from 'react';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';

import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import createApolloClient from './utils/getApolloClient';
import { getConnection } from '../common/utils/utils';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient;

export const initializeApollo = (
  initialState = null,
  { headers = {}, locale = '', endpoint = null } = {},
): ApolloClient<NormalizedCacheObject> => {
  const client =
    apolloClient ??
    createApolloClient({
      headers,
      locale,
      endpoint,
    });

  if (initialState) {
    const existingCache = client.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s)),
        ),
      ],
    });
    client.cache.restore(data);
  }

  if (typeof window === 'undefined') return client;
  if (!apolloClient) apolloClient = client;

  return client;
};

export function addApolloState(client, pageProps) {
  const current = pageProps;
  if (current?.props) {
    current.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return current;
}

export function useApollo(pageProps, { endpoint = null, ...rest } = {}) {
  const state = pageProps?.[APOLLO_STATE_PROP_NAME];
  const currentEndpoint = endpoint || getConnection()?.endpoint;

  const store = useMemo(() => {
    apolloClient = null;

    return initializeApollo(state, { endpoint: currentEndpoint, ...rest });
  }, [state, endpoint]);
  return store;
}
