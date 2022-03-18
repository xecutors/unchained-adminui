import { useQuery, gql } from '@apollo/client';
import ProductReviewFragment from '../fragments/ProductReviewFragment';

export const ProductReviewQuery = gql`
  query ProductReviews($productId: ID, $slug: String) {
    product(productId: $productId, slug: $slug) {
      _id
      reviews {
        ...ProductReviewFragment
      }
    }
  }
  ${ProductReviewFragment}
`;

const useProductReviews = ({ productId = null, slug = null } = {}) => {
  const { data, loading, error } = useQuery(ProductReviewQuery, {
    skip: !productId && !slug,
    variables: { productId, slug },
  });

  const product = data?.product || {};
  const reviews = product?.reviews || [];

  return {
    reviews,
    loading,
    error,
  };
};

export default useProductReviews;
