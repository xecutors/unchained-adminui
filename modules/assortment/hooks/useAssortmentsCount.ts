import { useQuery, gql } from '@apollo/client';

export const AssortmentsCountQuery = gql`
  query AssortmentsCount {
    assortmentsCount
  }
`;

const useAssortmentsCount = () => {
  const { data, loading, error } = useQuery(AssortmentsCountQuery);

  const assortmentsCount = data?.assortmentsCount;

  return {
    assortmentsCount,
    loading,
    error,
  };
};

export default useAssortmentsCount;
