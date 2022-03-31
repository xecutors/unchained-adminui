import { StarIcon, ThumbDownIcon, ThumbUpIcon } from '@heroicons/react/solid';
import { FormattedMessage, useIntl } from 'react-intl';

const ProductReviewsReport = ({ productReviews }) => {
  const { formatMessage } = useIntl();

  const totalUpVote = productReviews.reduce(
    (prev, next) => prev + next.upVote,
    0,
  );

  const totalDownVote = productReviews.reduce(
    (prev, next) => prev + next.downVote,
    0,
  );

  const averageVote = (totalUpVote / (totalUpVote + totalDownVote)) * 100;

  return (
    <div className="lg:col-span-4">
      <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
        {formatMessage({
          id: 'customer_reviews',
          defaultMessage: 'Customer Reviews',
        })}
      </h2>

      <div className="mt-3 flex items-center">
        <div>
          <div title={`${averageVote}`} className="flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                className={`
                        ${
                          averageVote >= rating * 20
                            ? 'text-yellow-400'
                            : 'text-slate-300'
                        }
                        h-5 w-5 flex-shrink-0
                      `}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
        <div className="ml-2 text-sm text-slate-900">
          <FormattedMessage
            id="review_summary"
            defaultMessage="<div> Based on <cta> {total} </cta> reviews</div>"
            values={{
              div: (chunks) => <div>{chunks}</div>,
              cta: (chunks) => <b className="font-bold">{chunks}</b>,
              total: productReviews.length,
            }}
          />
        </div>
      </div>

      <div className="mt-6">
        <h3 className="sr-only">
          {formatMessage({
            id: 'review_data',
            defaultMessage: 'Review data',
          })}
        </h3>

        <dl className="space-y-3">
          <div className="flex items-center text-sm">
            <dt className="flex flex-1 items-center">
              <p className="font-medium text-slate-900">{totalUpVote}</p>
              <div aria-hidden="true" className="ml-2 flex flex-1 items-center">
                <ThumbUpIcon
                  className={`
                          ${
                            totalUpVote > 0
                              ? 'text-yellow-400'
                              : 'text-slate-300'
                          }
                          h-5 w-5 flex-shrink-0`}
                  aria-hidden="true"
                />

                <div className="relative ml-3 flex-1">
                  <div className="h-3 rounded-full border border-gray-200 bg-slate-100" />
                  {totalUpVote > 0 ? (
                    <div
                      className="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"
                      style={{
                        width: `calc(${totalUpVote} / ${
                          totalUpVote + totalDownVote
                        } * 100%)`,
                      }}
                    />
                  ) : null}
                </div>
              </div>
            </dt>
            <dd className="ml-3 w-10 text-right text-sm tabular-nums text-slate-900">
              {Math.round((totalUpVote / (totalUpVote + totalDownVote)) * 100)}%
            </dd>
          </div>

          <div className="flex items-center text-sm">
            <dt className="flex flex-1 items-center">
              <p className="font-medium text-slate-900">
                {totalDownVote}
                <span className="sr-only">
                  {formatMessage({
                    id: 'star_reviews',
                    defaultMessage: 'Star reviews',
                  })}
                </span>
              </p>
              <div aria-hidden="true" className="ml-2 flex flex-1 items-center">
                <ThumbDownIcon
                  className={`
                          ${
                            totalDownVote > 0
                              ? 'text-yellow-400'
                              : 'text-slate-300'
                          }
                          h-5 w-5 flex-shrink-0
                        `}
                  aria-hidden="true"
                />

                <div className="relative ml-3 flex-1">
                  <div className="h-3 rounded-full border border-gray-200 bg-slate-100" />
                  {totalDownVote > 0 ? (
                    <div
                      className="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"
                      style={{
                        width: `calc(${totalDownVote} / ${
                          totalUpVote + totalDownVote
                        } * 100%)`,
                      }}
                    />
                  ) : null}
                </div>
              </div>
            </dt>
            <dd className="ml-3 w-10 text-right text-sm tabular-nums text-slate-900">
              {Math.round(
                (totalDownVote / (totalUpVote + totalDownVote)) * 100,
              )}
              %
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default ProductReviewsReport;
