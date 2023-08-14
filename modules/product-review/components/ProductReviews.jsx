import { FaceFrownIcon } from '@heroicons/react/24/solid';
import { useIntl } from 'react-intl';
import useProductReviewsByProductId from '../hooks/useProductReviewsByProductId';
import NoData from '../../common/components/NoData';
import ProductReviewsItem from './ProductReviewsItem';
import ProductReviewsReport from './ProductReviewsReport';
import ProductReviewForm from './ProductReviewForm';
import useCreateProductReview from '../hooks/useCreateProductReview';
import Button from '../../common/components/Button';

const ProductReviews = ({ productId }) => {
  const { productReviews, loadMore, reviewsCount } =
    useProductReviewsByProductId({
      productId,
    });
  const { createProductReview } = useCreateProductReview();
  const { formatMessage } = useIntl();

  return (
    <div className="mt-5 sm:max-w-full">
      {productReviews?.length ? (
        <div className="rounded bg-white dark:bg-slate-900 shadow text-slate-900 dark:shadow-none dark:text-slate-200">
          <div className="mx-auto p-4 sm:p-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:p-8">
            <ProductReviewsReport productReviews={productReviews} />

            <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
              {productId && (
                <ProductReviewForm
                  onSubmit={async ({ title, review, rating }) =>
                    await createProductReview({
                      productId,
                      title,
                      review,
                      rating: 10,
                    })
                  }
                />
              )}
              <h3 className="sr-only">
                {formatMessage({
                  id: 'recent_reviews',
                  defaultMessage: 'Recent reviews',
                })}
              </h3>

              <div className="flow-root">
                <div className="-my-3">
                  {productReviews.map((review) => (
                    <ProductReviewsItem key={review._id} review={review} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NoData message="Reviews" Icon={<FaceFrownIcon />} />
      )}
      {reviewsCount > productReviews?.length ? (
        <Button
          type="button"
          text={formatMessage({
            id: 'load-more-reviews',
            defaultMessage: 'Load reviews',
          })}
          onClick={loadMore}
        />
      ) : null}
    </div>
  );
};

export default ProductReviews;
