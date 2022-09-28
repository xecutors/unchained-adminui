import { useQuery, gql } from '@apollo/client';
import { parseUniqueId } from '../../common/utils/getUniqueId';
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

const useProductReviews = ({ productId: id = null, slug = null } = {}) => {
  const parsedId = parseUniqueId(slug);
  const { data, loading, error } = useQuery(ProductReviewQuery, {
    skip: !id && !parsedId,
    variables: { productId: id || parsedId },
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
