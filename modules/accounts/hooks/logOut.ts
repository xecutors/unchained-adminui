import { gql } from '@apollo/client';
import { getLoginToken, resetStore } from '../utils/store';

const logOut = async (apollo) => {
  const token = await getLoginToken();
  await apollo.mutate({
    mutation: gql`
      mutation Logout {
        logout {
          success
        }
      }
    `,
    awaitRefetchQueries: false,
    variables: { token },
  });
  await resetStore();
};

export default logOut;
