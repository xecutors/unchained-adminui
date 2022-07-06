import { offsetLimitPagination } from '@apollo/client/utilities';

/* eslint-disable no-underscore-dangle */
export const keyMappings: any = {
  Query: {
    fields: {
      Assortments: {
        keyArgs: [
          'limit',
          'includeLeaves',
          'includeInactive',
          'offset',
          'tags',
          'queryString',
          'slugs',
          'forceLocale',
        ],
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
      Products: {
        keyArgs: [
          'limit',
          'includeDrafts',
          'offset',
          'tags',
          'queryString',
          'forceLocale',
        ],
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
      Countries: {
        keyArgs: ['limit', 'includeInactive', 'offset', 'queryString'],
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
      Currencies: {
        keyArgs: ['limit', 'includeInactive', 'offset', 'queryString'],
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
      Enrollments: {
        keyArgs: ['limit', 'offset', 'queryString'],
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
      Quotations: {
        keyArgs: ['limit', 'offset', 'queryString'],
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
      WorkQueue: {
        keyArgs: ['limit', 'status', 'types', 'created', 'queryString'],
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
      Languages: {
        keyArgs: ['limit', 'includeInactive', 'offset', 'queryString'],
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
      Events: {
        keyArgs: ['limit', 'offset', 'types', 'queryString'],
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
      Filters: {
        keyArgs: ['limit', 'offset', 'queryString'],
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
    },
    Orders: {
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
