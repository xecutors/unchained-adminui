import { ThumbDownIcon, ThumbUpIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import DeleteButton from '../../common/components/DeleteButton';
import defaultNextImageLoader from '../../common/utils/defaultNextImageLoader';
import useFormatDateTime from '../../common/utils/useFormatDateTime';
import DangerMessage from '../../modal/components/DangerMessage';
import useModal from '../../modal/hooks/useModal';
import useRemoveProductReview from '../hooks/useRemoveProductReview';
import Badge from '../../common/components/Badge';

const ProductReviewsItem = ({ review }) => {
  const { formatMessage } = useIntl();
  const { formatDateTime } = useFormatDateTime();
  const { setModal } = useModal();

  const { removeProductReview } = useRemoveProductReview();

  const onRemove = async (reviewId) => {
    await setModal(
      <DangerMessage
        message={formatMessage({
          id: 'delete_review_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this review? ',
        })}
        onOkClick={async () => {
          setModal('');
          await removeProductReview({ reviewId });
          toast.success(
            formatMessage(
              {
                id: 'review_deleted',
                defaultMessage: 'Review {reviewId} deleted successfully',
              },
              {
                reviewId,
              },
            ),
          );
        }}
        okText={formatMessage({
          id: 'delete_review',
          defaultMessage: 'Delete review',
        })}
      />,
    );
  };

  return (
    <div
      key={review._id}
      className={classNames(
        'mb-2 rounded-md px-3 pb-3 pt-1',
        {
          'border-2 border-solid border-red-200': review.deleted,
        },
        {
          'border-2 border-solid border-slate-200': !review.deleted,
        },
      )}
    >
      <div className="flex items-center">
        <Image
          loader={defaultNextImageLoader}
          src={review?.author?.avatar?.url}
          alt={review?.author?.username}
          width={48}
          height={48}
          className="h-12 w-12 rounded-full"
          placeholder="blur"
          blurDataURL="/placeholder.png"
        />
        <div className="ml-4 mr-auto">
          <h4 className="text-sm font-bold">{review?.author?.username}</h4>
          <p className="text-sm font-normal text-slate-400">
            <time dateTime={review.updated || review.created}>
              {formatDateTime(review.updated || review.created, {
                dateStyle: 'short',
                timeStyle: 'short',
              })}
            </time>
          </p>
        </div>
        <div className="flex items-center">
          <ThumbUpIcon className="h-7 w-7 text-slate-400" />
          <span className="mx-2">{review.upVote}</span>
          <ThumbDownIcon className="h-7 w-7 text-slate-400" />
          <span className="mx-2">{review.downVote}</span>
        </div>
        {!review.deleted ? (
          <DeleteButton
            onClick={() => onRemove(review._id)}
            className="ml-auto"
          />
        ) : (
          <Badge
            text={formatMessage({
              id: 'deleted_text',
              defaultMessage: 'Deleted',
            })}
            color="red"
            className="ml-auto p-1"
          />
        )}
      </div>

      <div className="mt-4 space-y-2 text-base italic text-slate-600 dark:text-white">
        <h3 className="text-sm font-medium">{review.title}</h3>
        <p>{review.review}</p>
      </div>
    </div>
  );
};

export default ProductReviewsItem;
