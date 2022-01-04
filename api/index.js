import { ApolloServer } from 'apollo-server-micro';

import mapForwardHeaders from './mapForwardHeaders';
import { unchainedSchema } from './remotes';

const createApolloServer = async () => {
  return new ApolloServer({
    schema: await unchainedSchema,
    introspection: true,
    cors: false,
    cacheControl: true,
    tracing: false,
    context: (graphqlContext) => {
      return {
        ...graphqlContext,
        forwardHeaders: mapForwardHeaders(graphqlContext.req),
      };
    },
    playground: {
      settings: {
        'request.credentials': 'same-origin',
      },
    },
    plugins: [ ],
  });
};

const apolloServerPromise = createApolloServer();

const UnchainedApi = async (...args) => {
  const apolloServer = await apolloServerPromise;
  return apolloServer.createHandler({ path: '/api/graphql' })(...args);
};


export default UnchainedApi