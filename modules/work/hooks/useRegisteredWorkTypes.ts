import { useQuery, gql } from '@apollo/client';

export const WorkTypesQuery = gql`
  query WorkTypes {
    registeredWorkTypes: __type(name: "WorkType") {
      options: enumValues {
        value: name
        label: name
      }
    }
  }
`;

const useRegisteredWorkTypes = () => {
  const { data, loading, error } = useQuery(WorkTypesQuery);

  const workTypes = data?.registeredWorkTypes?.options || [];

  return {
    workTypes,
    loading,
    error,
  };
};

export default useRegisteredWorkTypes;
