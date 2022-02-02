import { useQuery, gql } from '@apollo/client';
import ProductMediaTextsFragment from '../fragments/ProductMediaTextsFragment';

export const ProductCatalogPricesQuery = gql`
  query ProductCatalogPrices($productId: ID!) {
    productCatalogPrices(productId: $productId) {
      ...ProductMediaTextsFragment
    }
  }
  ${ProductMediaTextsFragment}
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
