import { useQuery, gql } from '@apollo/client';

const ProductDetailQuery = gql`
  query ProductDetailQuery {
    products {
      _id
    }
  }
`;

const useProductDetail = () => {
  const { data, loading, error } = useQuery(ProductDetailQuery, {
    variables: {},
  });

  return {
    data,
    loading,
    error,
  };
};

export default useProductDetail;
