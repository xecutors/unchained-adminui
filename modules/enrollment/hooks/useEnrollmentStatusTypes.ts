import { useQuery, gql } from '@apollo/client';

export const EnrollmentStatusTypes = gql`
  query EnrollmentStatus {
    enrollmentStatusTypes: __type(name: "EnrollmentStatus") {
      options: enumValues {
        value: name
        label: description
      }
    }
  }
`;

const useEnrollmentStatusTypes = () => {
  const { data, loading, error } = useQuery(EnrollmentStatusTypes);

  const enrollmentStatusTypes = data?.enrollmentStatusTypes?.options || [];

  return {
    enrollmentStatusTypes,
    loading,
    error,
  };
};

export default useEnrollmentStatusTypes;
