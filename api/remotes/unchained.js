import {
  introspectSchema,
  makeRemoteExecutableSchema,
} from '@graphql-tools/wrap';
import fetch from 'isomorphic-unfetch';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
import { ApolloLink } from '@apollo/client';

import { linkToExecutor } from '@graphql-tools/links';
import setLoginCookie from './setLoginCookie';

/* const UNCHAINED_ENDPOINT = process.env.NEXT_PUBLIC_UNCHAINED_ENDPOINT;
console.log(`Connecting to Unchained API at: ${UNCHAINED_ENDPOINT}`);  */// eslint-disable-line

const httpLink = createUploadLink({
  uri: process.env.GRPAHQL_ENDPOINT,
  fetch,
  includeExtensions: true,
  credentials: 'same-origin',
});

const setCookieLink = setLoginCookie();

const errorFix = new ApolloLink((operation, forward) =>
  forward(operation).map((data) => {
    if (data.errors) {
      // eslint-disable-next-line
      for (const error of data.errors) {
        if (!(error instanceof Error))
          Object.setPrototypeOf(error, Error.prototype);
      }
    }

    return data;
  }),
);

const contextLink = setContext((request, previousContext) => {
  const { graphqlContext: { forwardHeaders } = {} } = previousContext;
  return {
    headers: forwardHeaders || {},
  };
});

export const link = ApolloLink.from([
  errorFix,
  contextLink,
  setCookieLink,
  httpLink,
]);

const UnchainedSchema = async () => {
  try {
    const executor = linkToExecutor(link);
    const schema = makeRemoteExecutableSchema({
      schema: await introspectSchema(executor),
      executor,
    });
    return schema;
  } catch (e) {
    console.error(e); // eslint-disable-line
    return null;
  }
};

export default UnchainedSchema;
