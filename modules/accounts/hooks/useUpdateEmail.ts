import { useMutation, gql } from '@apollo/client';

const UpdateEmailMutation = gql`
  mutation UpdateEmail($email: String!, $userId: ID) {
    updateEmail(email: $email, userId: $userId) {
      _id
    }
  }
`;

const useUpdateEmail = () => {
  const [updateEmailMutation] = useMutation(UpdateEmailMutation);

  const updateEmail = async ({ email, userId }) => {
    return updateEmailMutation({
      variables: {
        email,
        userId,
      },
    });
  };

  return {
    updateEmail,
  };
};

export default useUpdateEmail;
