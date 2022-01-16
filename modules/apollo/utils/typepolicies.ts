import { offsetLimitPagination } from '@apollo/client/utilities';

/* eslint-disable no-underscore-dangle */
export const keyMappings: any = {
  Query: {
    fields: {
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
      languages: {
        keyArgs: ['limit', 'includeInactive'],
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
      Log: offsetLimitPagination(),
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
