import { useQuery, gql } from '@apollo/client';
import ProductCatalogPricesFragment from '../fragments/ProductCatalogPricesFragment';

export const ProductCatalogPricesQuery = gql`
  query ProductCatalogPrices($productId: ID!) {
    productCatalogPrices(productId: $productId) {
      ...ProductCatalogPricesFragment
    }
  }
  ${ProductCatalogPricesFragment}
`;

const useProductCatalogPrices = ({ productId }) => {
  const { data, loading, error } = useQuery(ProductCatalogPricesQuery, {
    variables: {
      productId,
    },
  });
  const catalogPrices = data?.productCatalogPrices || [];

  return {
    catalogPrices,
    loading,
    error,
  };
};

export default useProductCatalogPrices;
