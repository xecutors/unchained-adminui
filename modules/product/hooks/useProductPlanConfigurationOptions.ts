import { useQuery, gql } from '@apollo/client';

export const ProductPlanConfigurationOptionsQuery = gql`
  query ProductPlanConfigurationOptions {
    usageCalculationTypes: __type(name: "ProductPlanUsageCalculationType") {
      options: enumValues {
        value: name
        label: description
      }
    }
    configurationIntervals: __type(name: "ProductPlanConfigurationInterval") {
      options: enumValues {
        value: name
        label: description
      }
    }
  }
`;

const useProductPlanConfigurationOptions = () => {
  const { data, loading, error } = useQuery(
    ProductPlanConfigurationOptionsQuery,
  );

  const usageCalculationTypes = data?.usageCalculationTypes?.options || [];
  const configurationIntervals = data?.configurationIntervals?.options || [];

  return {
    configurationIntervals,
    usageCalculationTypes,
    loading,
    error,
  };
};

export default useProductPlanConfigurationOptions;
