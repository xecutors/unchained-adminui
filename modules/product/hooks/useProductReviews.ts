import { useQuery, gql } from '@apollo/client';
import { parseUniqueId } from '../../common/utils/getUniqueId';
import ProductReviewFragment from '../fragments/ProductReviewFragment';

export const ProductReviewQuery = gql`
  query ProductReviews(
    $queryString: String
    $limit: Int
    $offset: Int
    $sort: [SortOptionInput!]
  ) {
    productReviews(
      queryString: $queryString
      limit: $limit
      offset: $offset
      sort: $sort
    ) {
      ...ProductReviewFragment
    }
  }
  ${ProductReviewFragment}
`;

const useProductReviews = ({
  queryString = '',
  limit = 10,
  offset = 0,
  sortOptions = [],
} = {}) => {
  const { data, loading, error } = useQuery(ProductReviewQuery, {
    variables: {
      queryString,
      limit: limit || 10,
      offset: offset || 0,
      sort: sortOptions?.length
        ? sortOptions
        : [{ key: 'created', value: 'DESC' }],
    },
  });

  const reviews = data?.productReviews || [];

  return {
    reviews,
    loading,
    error,
  };
};

export default useProductReviews;
