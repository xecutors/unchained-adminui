import { gql } from '@apollo/client';

const ProductCatalogPricesFragment = gql`
  fragment ProductCatalogPricesFragment on ProductCatalogPrice {
    _id
    isTaxable
    isNetPrice
    country {
      _id
      isoCode
      name
    }
    currency {
      _id
      isoCode
    }
    amount
    maxQuantity
  }
`;

export default ProductCatalogPricesFragment;
