import { ApolloLink } from '@apollo/client';

const loginMutations = [
  'loginWithPassword',
  'loginAsGuest',
  'verifyEmail',
  'createUser',
  'resetPassword',
];
const logoutMutations = ['logout'];

const extractMutationFromDataObject = (
  // eslint-disable-next-line no-undef
  data?: object,
  mutations: string[] = [],
) => {
  return mutations.reduce((acc, mutationName) => {
    if (data && data[mutationName]) {
      return {
        ...data[mutationName],
        __mutationName: mutationName,
      };
    }
    return acc;
  }, null);
};

export default () =>
  new ApolloLink((operation, forward) => {

    return forward(operation).map((response) => {
      const { graphqlContext: responseContext } = operation.getContext();
      const { data } = response;
      const loginMethodResponse = extractMutationFromDataObject(
        data,
        loginMutations,
      );
      const logoutMethodResponse = extractMutationFromDataObject(
        data,
        logoutMutations,
      );
      
      if (loginMethodResponse) {
        const { token, tokenExpires, __mutationName, ...rest } =
          loginMethodResponse;
        if (!tokenExpires || !token) {
          throw new Error(
            `Query token & tokenExpires on ${loginMethodResponse} so we can set the cookie server-side for you`,
          );
        }
        const formattedExpires = new Date(tokenExpires).toUTCString();

        responseContext.res.setHeader(
          'Set-Cookie',
          `token=${token};  HttpOnly; Expires=${formattedExpires};`,
        );
        response.data[__mutationName] = {
          token: '',
          tokenExpires,
          ...rest,
        };
      } else if (logoutMethodResponse) {
        responseContext.res.setHeader(
          'Set-Cookie',
          `token=; HttpOnly; Expires=-1; `,
        );
      }
      return response;
    });
  });
