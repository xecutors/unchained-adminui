import { useQuery, gql } from '@apollo/client';

export const ProductVariationTypesQuery = gql`
  query ProductVariationType {
    variationTypes: __type(name: "ProductVariationType") {
      options: enumValues {
        value: name
        label: description
      }
    }
  }
`;

const useProductVariationTypes = () => {
  const { data, loading, error } = useQuery(ProductVariationTypesQuery);

  const variationTypes = data?.variationTypes?.options || [];

  return {
    variationTypes,
    loading,
    error,
  };
};

export default useProductVariationTypes;
