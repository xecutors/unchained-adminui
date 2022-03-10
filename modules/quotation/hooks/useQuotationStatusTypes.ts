import { useQuery, gql } from '@apollo/client';

export const QuotationStatusTypesQuery = gql`
  query QuotationStatus {
    quotationStatusType: __type(name: "QuotationStatus") {
      options: enumValues {
        value: name
        label: description
      }
    }
  }
`;

const useQuotationStatusTypes = () => {
  const { data, loading, error } = useQuery(QuotationStatusTypesQuery);

  const quotationStatusTypes = data?.quotationStatusType?.options || [];

  return {
    quotationStatusTypes,
    loading,
    error,
  };
};

export default useQuotationStatusTypes;
