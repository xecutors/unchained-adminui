import { offsetLimitPagination } from '@apollo/client/utilities';

/* eslint-disable no-underscore-dangle */
const keyMappings: any = {
  Query: {
    fields: {
      assortments: {
        keyArgs: [
          'includeLeaves',
          'includeInactive',
          'tags',
          'queryString',
          'slugs',
          'limit',
        ],
        merge(existing = [], incoming = []) {
          return [...existing, ...incoming];
        },
      },
      products: {
        keyArgs: ['includeDrafts', 'tags', 'queryString', 'sort', 'limit'],
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
      product: {
        keyArgs: ['productId', 'slug'],
        fields: {
          reviews: offsetLimitPagination(),
        },
      },
      user: {
        keyArgs: ['userId'],
        fields: {
          reviews: offsetLimitPagination(),
        },
      },
      countries: {
        keyArgs: ['includeInactive', 'queryString', 'sort', 'limit'],
        merge(existing = [], incoming = []) {
          return [...existing, ...incoming];
        },
      },
      currencies: {
        keyArgs: ['includeInactive', 'queryString', 'sort', 'limit'],
        merge(existing = [], incoming = []) {
          return [...existing, ...incoming];
        },
      },
      enrollments: {
        keyArgs: ['queryString', 'status', 'sort', 'limit'],
        merge(existing = [], incoming = []) {
          return [...existing, ...incoming];
        },
      },
      quotations: {
        keyArgs: ['queryString', 'sort', 'limit'],
        merge(existing = [], incoming = []) {
          return [...existing, ...incoming];
        },
      },
      workQueue: {
        ...offsetLimitPagination([
          'status',
          'types',
          'created',
          'queryString',
          'limit',
        ]),
      },
      languages: {
        keyArgs: ['includeInactive', 'queryString', 'sort', 'limit'],
        merge(existing = [], incoming = []) {
          return [...existing, ...incoming];
        },
      },
      events: {
        keyArgs: ['types', 'queryString', 'sort', 'limit'],
        merge(existing = [], incoming = []) {
          return [...existing, ...incoming];
        },
      },
      users: {
        keyArgs: ['includeGuests', 'queryString', 'limit'],
        merge(existing = [], incoming = []) {
          return [...existing, ...incoming];
        },
      },
      filters: {
        keyArgs: ['queryString', 'includeInactive', 'sort', 'limit'],
        merge(existing = [], incoming = []) {
          return [...existing, ...incoming];
        },
      },
      orders: {
        keyArgs: ['includeCarts', 'queryString', 'sort', 'limit'],
        merge(existing = [], incoming = []) {
          return [...existing, ...incoming];
        },
      },
    },
  },
};

const keyFields: any = {
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
