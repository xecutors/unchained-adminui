import ProductReviewsItem from './ProductReviewsItem';

const ProductReviewsList = ({ reviews, className = '' }) => {
  if (!reviews || !reviews.length) return null;

  return (
    <div className={`${className || ''} `}>
      {reviews.map((review) => (
        <ProductReviewsItem
          key={review._id}
          review={review}
          enableDelete={false}
        />
      ))}
    </div>
  );
};

export default ProductReviewsList;
