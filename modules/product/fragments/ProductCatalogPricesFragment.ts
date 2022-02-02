import { gql } from '@apollo/client';

const ProductCatalogPricesFragment = gql`
  fragment ProductCatalogPricesFragment on ProductTexts {
    _id
    locale
    slug
    title
    subtitle
    description
    vendor
    brand
    labels
  }
`;

export default ProductCatalogPricesFragment;
