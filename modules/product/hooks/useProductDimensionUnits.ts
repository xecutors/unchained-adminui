import { useQuery, gql } from '@apollo/client';

export const ProductDimensionUnitsTypeQuery = gql`
  query ProductDimensionUnits {
    massUnits: __type(name: "MassUnit") {
      options: enumValues {
        value: name
        label: description
      }
    }
    lengthUnits: __type(name: "LengthUnit") {
      options: enumValues {
        value: name
        label: description
      }
    }
  }
`;

const useProductDimensionUnits = () => {
  const { data, loading, error } = useQuery(ProductDimensionUnitsTypeQuery);

  const { massUnits: massU = {}, lengthUnits: lengthU = {} } = data || {};
  const massUnits = massU?.options || [];
  const lengthUnits = lengthU?.options || [];

  return {
    massUnits,
    lengthUnits,
    loading,
    error,
  };
};

export default useProductDimensionUnits;
