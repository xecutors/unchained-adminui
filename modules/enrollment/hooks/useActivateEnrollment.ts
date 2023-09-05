import { useMutation, gql } from '@apollo/client';
import {
  IActivateEnrollmentMutation,
  IActivateEnrollmentMutationVariables,
} from '../../../gql/types';

const ActivateEnrollmentMutation = gql`
  mutation ActivateEnrollment($enrollmentId: ID!) {
    activateEnrollment(enrollmentId: $enrollmentId) {
      _id
    }
  }
`;

const useActivateEnrollment = () => {
  const [activateEnrollmentMutation] = useMutation<
    IActivateEnrollmentMutation,
    IActivateEnrollmentMutationVariables
  >(ActivateEnrollmentMutation);

  const activateEnrollment = async ({
    enrollmentId,
  }: IActivateEnrollmentMutationVariables) => {
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
