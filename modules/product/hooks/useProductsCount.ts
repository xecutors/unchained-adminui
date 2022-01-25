import { useQuery, gql } from '@apollo/client';

export const ProductsCountQuery = gql`
  query ProductsCount {
    productsCount
  }
`;

const useProductsCount = () => {
  const { data, loading, error } = useQuery(ProductsCountQuery);

  const productsCount = data?.productsCount;

  return {
    productsCount,
    loading,
    error,
  };
};

export default useProductsCount;
