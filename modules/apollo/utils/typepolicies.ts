import { offsetLimitPagination } from '@apollo/client/utilities';

/* eslint-disable no-underscore-dangle */
export const keyMappings: any = {
  Query: {
    fields: {
      assortments: {
        keyArgs: [
          'limit',
          'includeLeaves',
          'includeInactive',
          'offset',
          'tags',
          'queryString',
          'slugs',
        ],
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
      products: {
        keyArgs: ['limit', 'includeDrafts', 'offset', 'tags', 'queryString'],
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
      countries: {
        keyArgs: ['limit', 'includeInactive', 'offset', 'queryString'],
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
      currencies: {
        keyArgs: ['limit', 'includeInactive', 'offset', 'queryString'],
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
      enrollments: {
        keyArgs: ['limit', 'offset', 'queryString'],
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
      quotations: {
        keyArgs: ['limit', 'offset', 'queryString'],
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
      WorkQueue: {
        keyArgs: ['limit', 'status', 'selectTypes', 'created', 'queryString'],
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
      languages: {
        keyArgs: ['limit', 'includeInactive', 'offset', 'queryString'],
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
      events: {
        keyArgs: ['limit', 'offset', 'type', 'queryString'],
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
      users: {
        keyArgs: ['limit', 'includeGuests', 'queryString', 'offset'],
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
      filters: {
        keyArgs: ['limit', 'offset', 'queryString'],
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
    },
    orders: {
      keyArgs: ['limit', 'includeCarts', 'offset', 'queryString'],
      merge(existing = [], incoming) {
        return [...existing, ...incoming];
      },
    },
  },

  SearchResult: {
    fields: {
      products: offsetLimitPagination(),
    },
  },
};

export const keyFields: any = {
  keyFields: (result: any) => {
    if (result?._id && result?.__typename) {
      return `${result?.__typename}:${result?._id}`;
    }
    if (result?.id && result?.__typename) {
      return `${result.__typename}:${result.id}`;
    }
    return null;
  },
};

const typePolicies = { ...keyMappings, ...keyFields };

export default typePolicies;
