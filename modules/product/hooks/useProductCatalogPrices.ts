import { useQuery, gql } from '@apollo/client';
import ProductCatalogPriceFragment from '../fragments/ProductCatalogPriceFragment';

export const ProductCatalogPricesQuery = gql`
  query ProductCatalogPrices($productId: ID!) {
    productCatalogPrices(productId: $productId) {
      ...ProductCatalogPriceFragment
    }
  }
  ${ProductCatalogPriceFragment}
`;

const useProductCatalogPrices = ({ productId }) => {
  const { data, loading, error } = useQuery(ProductCatalogPricesQuery, {
    skip: !productId,
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
