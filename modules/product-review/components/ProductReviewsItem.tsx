import {
  FlagIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
} from '@heroicons/react/24/solid';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import DeleteButton from '../../common/components/DeleteButton';
import useFormatDateTime from '../../common/utils/useFormatDateTime';
import DangerMessage from '../../modal/components/DangerMessage';
import useModal from '../../modal/hooks/useModal';
import useRemoveProductReview from '../hooks/useRemoveProductReview';
import Badge from '../../common/components/Badge';
import ImageWithFallback from '../../common/components/ImageWithFallback';
import formatUsername from '../../common/utils/formatUsername';
import useAddProductReviewVote from '../hooks/useAddProductReviewVote';
import Button from '../../common/components/Button';
import useRemoveProductReviewVote from '../hooks/useRemoveProductReviewVote';
import useAuth from '../../Auth/useAuth';
import useCurrentUser from '../../accounts/hooks/useCurrentUser';
import ProductReviewReportCommentForm from './ProductReviewReportCommentForm';
import CustomError from '../../common/CustomError';
import { OnSubmitType } from '../../forms/hooks/useForm';
import { IUser } from '../../../gql/types';

const voteTypes = {
  UPVOTE: 'UPVOTE',
  DOWNVOTE: 'DOWNVOTE',
  REPORT: 'REPORT',
};

const ProductReviewsItem = ({
  review,
  enableDelete = true,
  showProduct = false,
}) => {
  const { formatMessage } = useIntl();
  const { currentUser } = useCurrentUser();
  const { formatDateTime } = useFormatDateTime();
  const { setModal } = useModal();
  const { addProductReviewVote } = useAddProductReviewVote();
  const { removeProductReviewVote } = useRemoveProductReviewVote();
  const { hasRole, isAdmin } = useAuth();

  const hasAlreadyVoted = (type) =>
    !!review.ownVotes.find((v) => v.type === type);
  const toggleVote = async (type) => {
    const onReportSubmit: OnSubmitType = async ({ message }) => {
      try {
        await addProductReviewVote({
          productReviewId: review._id,
          type,
          meta: { message },
        });
        return { success: true };
      } catch (e: any) {
        if (e instanceof CustomError)
          return { success: false, error: e?.message };
        else return { success: false, error: e };
      }
    };

    if (hasAlreadyVoted(type)) {
      await removeProductReviewVote({ productReviewId: review._id, type });
    } else {
      if (type === voteTypes.REPORT) {
        await setModal(
          <ProductReviewReportCommentForm
            onSubmit={onReportSubmit}
            onSubmitSuccess={async () => setModal(null)}
          />,
        );
      } else {
        await addProductReviewVote({ productReviewId: review._id, type });
      }
    }
  };

  const { removeProductReview } = useRemoveProductReview();
  const canDeleteReview =
    (!review.deleted &&
      hasRole('voteProductReview') &&
      enableDelete &&
      review?.author?._id === currentUser._id) ||
    (isAdmin(currentUser as IUser) && !review.deleted);

  const canManageVotes = !review.deleted && hasRole('voteProductReview');
  const product = review?.product;

  const onRemove = async (productReviewId) => {
    await setModal(
      <DangerMessage
        onCancelClick={async () => setModal('')}
        message={formatMessage({
          id: 'delete_review_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this review? ',
        })}
        onOkClick={async () => {
          setModal('');
          await removeProductReview({ productReviewId });
          toast.success(
            formatMessage({
              id: 'review_deleted',
              defaultMessage: 'Review deleted successfully',
            }),
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
          'border-2 border-solid border-slate-200 dark:border-slate-800':
            !review.deleted,
        },
      )}
    >
      <div className="flex items-center">
        {showProduct ? (
          <ImageWithFallback
            src={product?.media[0]?.file?.url}
            alt={review?.author?.username}
            width={48}
            height={48}
            className="h-12 w-12 rounded-full"
          />
        ) : (
          <ImageWithFallback
            src={review?.author?.avatar?.url}
            alt={review?.author?.username}
            width={48}
            height={48}
            className="h-12 w-12 rounded-full"
          />
        )}
        <div className="ml-4 mr-auto">
          <h4 className="text-sm font-bold text-slate-600">
            {showProduct
              ? product?.texts?.title || (
                  <>
                    {product._id}{' '}
                    <Badge
                      color="yellow"
                      text={formatMessage({
                        id: 'title_not_found',
                        defaultMessage: 'Title not found',
                      })}
                    />
                  </>
                )
              : formatUsername(review?.author)}
          </h4>
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
          <button
            type="button"
            disabled={!canManageVotes}
            onClick={async () => toggleVote(voteTypes.UPVOTE)}
          >
            <HandThumbUpIcon
              className={`h-7 w-7
            ${
              hasAlreadyVoted(voteTypes.UPVOTE)
                ? 'text-yellow-400'
                : 'text-slate-400'
            }`}
            />
            <span className="mx-2 text-slate-600">{review.upVote}</span>
          </button>
          <button
            type="button"
            disabled={!canManageVotes}
            onClick={async () => toggleVote(voteTypes.DOWNVOTE)}
          >
            <HandThumbDownIcon
              className={`h-7 w-7
            ${
              hasAlreadyVoted(voteTypes.DOWNVOTE)
                ? 'text-yellow-400'
                : 'text-slate-400'
            }            
          `}
            />
            <span className="mx-2 text-slate-600 ">{review.downVote}</span>
          </button>
        </div>

        {canDeleteReview ? (
          <DeleteButton
            onClick={() => onRemove(review._id)}
            className="ml-auto"
          />
        ) : null}
        {review.deleted ? (
          <Badge
            text={formatMessage({
              id: 'deleted_text',
              defaultMessage: 'Deleted',
            })}
            color="red"
            className="ml-auto p-1"
          />
        ) : null}
        {hasRole('voteProductReview') && (
          <Button
            disabled={!canManageVotes}
            text={
              <FlagIcon
                className={classNames(
                  'h-5 w-5 border-slate-600  text-slate-400 border-3',
                  {
                    'text-yellow-400': hasAlreadyVoted(voteTypes.REPORT),
                    'text-slate-400': !hasAlreadyVoted(voteTypes.REPORT),
                    'hover:text-white': canManageVotes,
                  },
                )}
              />
            }
            onClick={async () => toggleVote(voteTypes.REPORT)}
            className={classNames('p-0 bg-white', {
              'hover:bg-slate-300': canManageVotes,
              'hover:bg-white': !canManageVotes,
            })}
          />
        )}
      </div>

      <div className="mt-4 space-y-2 text-base italic text-slate-600 dark:text-slate-600">
        <h3 className="text-sm font-medium">{review.title}</h3>
        <p>{review.review}</p>
      </div>
    </div>
  );
};

export default ProductReviewsItem;
