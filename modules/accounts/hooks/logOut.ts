import { gql } from '@apollo/client';

const logOut = async (apollo) => {
  await apollo.mutate({
    mutation: gql`
      mutation Logout {
        logout {
          success
        }
      }
    `,
  });
  await apollo.resetStore();
};

export default logOut;
