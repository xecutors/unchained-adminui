import { useQuery, gql } from '@apollo/client';
import {
  IEnrollmentQuery,
  IEnrollmentQueryVariables,
} from '../../../gql/types';
import useUnchainedContext from '../../UnchainedContext/useUnchainedContext';
import EnrollmentDetailFragment from '../fragments/EnrollmentDetailFragment';

export const GetEnrollmentQuery = (inlineFragment = '') => gql`
  query Enrollment($enrollmentId: ID!) {
    enrollment(enrollmentId: $enrollmentId) {
      ...EnrollmentDetailFragment
      ${inlineFragment}

    }
  }
  ${EnrollmentDetailFragment}
`;

const useEnrollment = ({ enrollmentId = null }: IEnrollmentQueryVariables) => {
  const { customProperties } = useUnchainedContext();
  const { data, loading, error } = useQuery<
    IEnrollmentQuery,
    IEnrollmentQueryVariables
  >(GetEnrollmentQuery(customProperties?.Enrollment), {
    skip: !enrollmentId,
    variables: { enrollmentId },
  });
  const enrollment = data?.enrollment || {};

  return {
    enrollment,
    loading,
    error,
  };
};

export default useEnrollment;
