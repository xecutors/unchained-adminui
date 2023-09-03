import { useQuery, gql } from '@apollo/client';
import {
  IProductReviewByProductQuery,
  IProductReviewByProductQueryVariables,
  ISortOptionInput,
} from '../../../gql/types';
import ProductReviewDetailFragment from '../fragments/ProductReviewDetailFragment';

export const ProductReviewQuery = gql`
  query ProductReviewByProduct(
    $productId: ID
    $slug: String
    $limit: Int
    $offset: Int
    $sort: [SortOptionInput!]
  ) {
    product(productId: $productId, slug: $slug) {
      _id
      reviews(limit: $limit, offset: $offset, sort: $sort) {
        ...ProductReviewDetailFragment
      }
      reviewsCount
    }
  }
  ${ProductReviewDetailFragment}
`;

const useProductReviewsByProductId = ({
  productId = null,
  slug = null,
  limit = 10,
  offset = 0,
  sort: sortOptions = [{ key: 'created', value: 'DESC' }] as ISortOptionInput[],
}: IProductReviewByProductQueryVariables = {}) => {
  const { data, loading, error, fetchMore } = useQuery<
    IProductReviewByProductQuery,
    IProductReviewByProductQueryVariables
  >(ProductReviewQuery, {
    skip: !productId,
    variables: { productId, slug, limit, offset, sort: sortOptions },
  });
  const product = data?.product;
  const productReviews = product?.reviews || [];
  const reviewsCount = product?.reviewsCount || 0;
  const loadMore = () => {
    fetchMore({
      variables: { offset: productReviews?.length },
    });
  };
  return {
    productReviews,
    loading,
    error,
    reviewsCount,
    loadMore,
  };
};

export default useProductReviewsByProductId;
