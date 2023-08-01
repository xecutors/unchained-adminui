import { FaceFrownIcon } from '@heroicons/react/24/solid';
import { useIntl } from 'react-intl';
import useProductReviewsByProductId from '../hooks/useProductReviewsByProductId';
import NoData from '../../common/components/NoData';
import ProductReviewsItem from './ProductReviewsItem';
import ProductReviewsReport from './ProductReviewsReport';

const ProductReviews = ({ productId }) => {
  const { productReviews } = useProductReviewsByProductId({
    productId,
  });
  const { formatMessage } = useIntl();

  return (
    <div className="mt-5 sm:max-w-full">
      {productReviews?.length ? (
        <div className="rounded bg-white dark:bg-slate-900 shadow text-slate-900 dark:shadow-none dark:text-slate-200">
          <div className="mx-auto p-4 sm:p-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:p-8">
            <ProductReviewsReport productReviews={productReviews} />

            <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
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
    </div>
  );
};

export default ProductReviews;
