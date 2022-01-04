/* eslint-disable @typescript-eslint/no-explicit-any */
import { offsetLimitPagination } from '@apollo/client/utilities';

/* eslint-disable no-underscore-dangle */
export const keyMappings: any = {
  SearchResult: {
    fields: {
      products: offsetLimitPagination(),
    },
  },
  PublicareClient: {
    fields: {
      orders: offsetLimitPagination(),
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

export default { ...keyMappings, ...keyFields };
