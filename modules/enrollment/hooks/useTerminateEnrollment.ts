import { useMutation, gql } from '@apollo/client';

const TerminateEnrollmentMutation = gql`
  mutation TerminateEnrollment($enrollmentId: ID!) {
    terminateEnrollment(enrollmentId: $enrollmentId) {
      _id
    }
  }
`;

const useTerminateEnrollment = () => {
  const [terminateEnrollmentMutation] = useMutation(
    TerminateEnrollmentMutation,
  );

  const terminateEnrollment = async ({ enrollmentId }) => {
    return terminateEnrollmentMutation({
      variables: { enrollmentId },
      refetchQueries: ['Enrollments', 'Enrollment'],
    });
  };

  return {
    terminateEnrollment,
  };
};

export default useTerminateEnrollment;
