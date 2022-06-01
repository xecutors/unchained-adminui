import { useQuery, gql } from '@apollo/client';
import { useIntl } from 'react-intl';

import ProductAssignmentFragment from '../fragments/ProductAssignmentFragment';

export const ProductAssignmentQuery = gql`
  query ProductAssignments(
    $productId: ID
    $slug: String
    $forceLocale: String
  ) {
    product(productId: $productId, slug: $slug) {
      _id
      ... on ConfigurableProduct {
        texts(forceLocale: $forceLocale) {
          _id
          subtitle
          slug
          title
        }
        variations {
          _id
          key
          texts {
            _id
            title
          }
          options {
            _id
            value
            texts {
              _id
              title
            }
          }
        }
        assignments(includeInactive: true) {
          ...ProductAssignmentFragment
        }
      }
    }
  }
  ${ProductAssignmentFragment}
`;

const useProductAssignments = ({
  productId = null,
  slug = null,
  locale = null,
} = {}) => {
  const { locale: defaultLocale } = useIntl();
  const forceLocale = locale || defaultLocale;
  const { data, loading, error } = useQuery(ProductAssignmentQuery, {
    skip: !productId && !slug,
    variables: { productId, slug, forceLocale },
  });

  const product = data?.product || {};

  return {
    product,
    loading,
    error,
  };
};

export default useProductAssignments;
