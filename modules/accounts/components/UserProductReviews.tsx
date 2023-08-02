import useUserProductReviews from '../../product-review/hooks/useUserProductReviews';
import ProductReviewsList from '../../product-review/components/ProductReviewsList';

const UserProductReviews = ({ _id }) => {
  const { reviews } = useUserProductReviews({ userId: _id });

  return (
    <div className="space-y-4 mt-4 bg-white">
      <ProductReviewsList reviews={reviews} />
    </div>
  );
};

export default UserProductReviews;
