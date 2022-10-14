import { useQuery, gql } from '@apollo/client';

export const SmartContractStandardsQuery = gql`
  query SmartContractStandards {
    smartContractStandards: __type(name: "SmartContractStandard") {
      options: enumValues {
        value: name
        label: name
      }
    }
  }
`;

const useSmartContractStandards = () => {
  const { data, loading, error } = useQuery(SmartContractStandardsQuery);

  const smartContractStandards = data?.smartContractStandards?.options || [];

  return {
    smartContractStandards,
    loading,
    error,
  };
};

export default useSmartContractStandards;
