import { offsetLimitPagination } from '@apollo/client/utilities';

/* eslint-disable no-underscore-dangle */
export const keyMappings: any = {
  Query: {
    fields: {
      assortments: {
        keyArgs: ['limit', 'includeLeaves', 'includeInactive'],
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
      products: {
        keyArgs: ['limit', 'includeDrafts'],
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
      countries: {
        keyArgs: ['limit', 'includeInactive'],
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
      currencies: {
        keyArgs: ['limit', 'includeInactive'],
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
      enrollments: {
        keyArgs: ['limit'],
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
      quotations: {
        keyArgs: ['limit'],
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
      workQueue: {
        keyArgs: ['limit'],
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
      languages: {
        keyArgs: ['limit', 'includeInactive'],
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
      events: {
        keyArgs: ['limit'],
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
      users: {
        keyArgs: ['limit', 'includeGuests', 'queryString'],
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
      filters: {
        keyArgs: ['limit'],
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
      Log: offsetLimitPagination(),
    },
    orders: {
      keyArgs: ['limit', 'includeCarts'],
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
