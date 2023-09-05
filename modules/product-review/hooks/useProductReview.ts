import { useQuery, gql } from '@apollo/client';
import {
  IProductReviewQuery,
  IProductReviewQueryVariables,
} from '../../../gql/types';
import useUnchainedContext from '../../UnchainedContext/useUnchainedContext';
import ProductReviewDetailFragment from '../fragments/ProductReviewDetailFragment';

export const GetProductReviewQuery = (inlineFragment = '') => gql`
  query ProductReview($productReviewId: ID!) {
    productReview(productReviewId: $productReviewId) {
      ...ProductReviewDetailFragment
      ${inlineFragment}
    }
  }
  ${ProductReviewDetailFragment}
`;

const useProductReview = ({
  productReviewId = null,
}: IProductReviewQueryVariables) => {
  const { customProperties } = useUnchainedContext();
  const { data, loading, error } = useQuery<
    IProductReviewQuery,
    IProductReviewQueryVariables
  >(GetProductReviewQuery(customProperties?.ProductReview), {
    skip: !productReviewId,
    variables: { productReviewId },
  });

  return {
    review: data?.productReview,
    loading,
    error,
  };
};

export default useProductReview;
