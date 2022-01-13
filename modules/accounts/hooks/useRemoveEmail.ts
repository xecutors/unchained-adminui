import { useMutation, gql } from '@apollo/client';

const RemoveEmailMutation = gql`
  mutation RemoveEmail($email: String!, $userId: ID) {
    removeEmail(email: $email, userId: $userId) {
      _id
      emails {
        verified
        address
      }
    }
  }
`;

const useRemoveEmail = () => {
  const [removeEmailMutation] = useMutation(RemoveEmailMutation);

  const removeEmail = async ({ email, userId }) => {
    return removeEmailMutation({
      variables: {
        email,
        userId,
      },
    });
  };

  return {
    removeEmail,
  };
};

export default useRemoveEmail;
