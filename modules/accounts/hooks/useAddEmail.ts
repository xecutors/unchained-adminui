import { useMutation, gql } from '@apollo/client';

const AddEmailMutation = gql`
  mutation AddEmail($email: String!, $userId: ID) {
    addEmail(email: $email, userId: $userId) {
      _id
      emails {
        verified
        address
      }
    }
  }
`;

const useAddEmail = () => {
  const [addEmailMutation] = useMutation(AddEmailMutation);

  const addEmail = async ({ email, userId }) => {
    return addEmailMutation({
      variables: { email, userId },
    });
  };

  return {
    addEmail,
  };
};

export default useAddEmail;
