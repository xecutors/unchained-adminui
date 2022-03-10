import { useMutation, gql } from '@apollo/client';

const ActivateEnrollmentMutation = gql`
  mutation ActivateEnrollment($enrollmentId: ID!) {
    activateEnrollment(enrollmentId: $enrollmentId) {
      _id
    }
  }
`;

const useActivateEnrollment = () => {
  const [activateEnrollmentMutation] = useMutation(ActivateEnrollmentMutation);

  const activateEnrollment = async ({ enrollmentId }) => {
    return activateEnrollmentMutation({
      variables: { enrollmentId },
      refetchQueries: ['Enrollments', 'Enrollment'],
    });
  };

  return {
    activateEnrollment,
  };
};

export default useActivateEnrollment;
