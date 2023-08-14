import ProductReviewsItem from './ProductReviewsItem';

const ProductReviewsList = ({
  reviews,
  className = '',
  enableDelete = false,
  showProduct = false,
}) => {
  if (!reviews || !reviews.length) return null;

  return (
    <div className={`${className || ''} `}>
      {reviews.map((review) => (
        <ProductReviewsItem
          showProduct={showProduct}
          key={review._id}
          review={review}
          enableDelete={enableDelete}
        />
      ))}
    </div>
  );
};

export default ProductReviewsList;
