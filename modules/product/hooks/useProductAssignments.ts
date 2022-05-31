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
        assignments {
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
  const assignments = product?.assignments || [];

  return {
    assignments,
    loading,
    error,
  };
};

export default useProductAssignments;
