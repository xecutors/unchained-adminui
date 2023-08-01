import { useQuery, gql } from '@apollo/client';
import ProductReviewDetailFragment from '../fragments/ProductReviewDetailFragment';

export const ProductReviewQuery = gql`
  query ProductReviewByProduct($productId: ID, $slug: String) {
    product(productId: $productId, slug: $slug) {
      _id
      reviews {
        ...ProductReviewDetailFragment
      }
    }
  }
  ${ProductReviewDetailFragment}
`;

const useProductReviewsByProductId = ({
  productId = null,
  slug = null,
} = {}) => {
  const { data, loading, error } = useQuery(ProductReviewQuery, {
    skip: !productId,
    variables: { productId, slug },
  });
  const product = data?.product;
  const productReviews = product?.reviews || [];
  return {
    productReviews,
    loading,
    error,
  };
};

export default useProductReviewsByProductId;
