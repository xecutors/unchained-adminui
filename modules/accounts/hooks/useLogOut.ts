import { useMutation, gql } from '@apollo/client';

const LogOutMutation = gql`
             mutation LogOut($token: String) {
          logout(token: $token) {
            success
          }
        }
`;

const useLogOut = () => {
  const [logOutMutation] = useMutation(LogOutMutation);

  const logOut = async ({ token }) => {
    return logOutMutation({
      variables: {token},
    });
  };

  return {
    logOut,
  };
};

export default useLogOut;
