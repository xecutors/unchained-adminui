import Image from 'next/image';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';
import MediaAvatar from '../../common/components/MediaAvatar';
import Table from '../../common/components/Table';
import defaultNextImageLoader from '../../common/utils/defaultNextImageLoader';

const USER_STATUS = {
  isGuest: 'red',
};

const ProductReviewListItem = ({ ProductReview, showAvatar }) => {
  const { formatMessage } = useIntl();

  return (
    <Table.Row>
      <Table.Cell className=" whitespace-nowrap px-3">
        <div className="flex items-center pl-2  text-sm text-gray-900">
          <Link href={`product-review/${ProductReview._id}`}>
            <a className=" text-blue-600">
              <Image
                loader={defaultNextImageLoader}
                src={ProductReview.product?.media.file.url}
                width={40}
                height={20}
              />
              <span className="ml-2 self-end">
                {ProductReview.product?.texts.title}
              </span>
            </a>
          </Link>
        </div>
      </Table.Cell>

      <Table.Cell className=" mx-2 whitespace-nowrap px-4">
        <a className="whitespace-nowrap text-blue-600">
          <Image
            loader={defaultNextImageLoader}
            src={ProductReview.author?.avatar.url}
            width={40}
            height={20}
          />
          <span className="ml-1 self-end">
            {ProductReview.author?.username}
          </span>
          {ProductReview.author.isGuest && (
            <Badge
              className="ml-3"
              text={formatMessage({
                id: 'Guest',
                defaultMessage: 'Guest',
              })}
              color="red"
            />
          )}
        </a>
      </Table.Cell>

      <Table.Cell className=" whitespace-nowrap px-3">
        <div className="flex">
          <div className="flex items-center pl-6 text-sm text-gray-900">
            <a className="text-blue-600">
              {ProductReview?.rating || (
                <>
                  {ProductReview._id}{' '}
                  <Badge
                    color="blue"
                    text={formatMessage({
                      id: 'rating',
                      defaultMessage: 'rating',
                    })}
                  />
                </>
              )}
            </a>
          </div>
        </div>
      </Table.Cell>
      <Table.Cell className=" whitespace-nowrap  px-3">
        <div className="flex">
          <div className="flex items-center pl-2 text-sm text-gray-900">
            <a className="">
              {ProductReview?.created || (
                <>
                  {ProductReview._id}{' '}
                  <Badge
                    text={formatMessage({
                      id: 'created',
                      defaultMessage: 'created',
                    })}
                  />
                </>
              )}
            </a>
          </div>
        </div>
      </Table.Cell>
      <Table.Cell className=" whitespace-nowrap   px-3">
        <div className="flex">
          <div className="flex items-center pl-2 text-sm text-gray-900">
            <a className="text-blue-600">
              {ProductReview?.title || (
                <>
                  {ProductReview._id}{' '}
                  <Badge
                    color="blue"
                    text={formatMessage({
                      id: 'title',
                      defaultMessage: 'title',
                    })}
                  />
                </>
              )}
            </a>
          </div>
        </div>
      </Table.Cell>
      <Table.Cell className=" whitespace-nowrap px-3">
        <div className="flex">
          <div className="flex items-center pl-4 text-sm text-gray-900">
            <a className="text-blue-600">
              {ProductReview?.upVote || (
                <>
                  {ProductReview._id}{' '}
                  <Badge
                    color="blue"
                    text={formatMessage({
                      id: 'up_vote',
                      defaultMessage: 'upVote',
                    })}
                  />
                </>
              )}
            </a>
          </div>
        </div>
      </Table.Cell>
      <Table.Cell className=" whitespace-nowrap px-3">
        <div className="flex">
          <div className="flex items-center pl-4 text-sm text-gray-900">
            <a className="text-blue-600">
              {ProductReview?.downVote || (
                <>
                  {ProductReview._id}{' '}
                  <Badge
                    color="blue"
                    text={formatMessage({
                      id: 'down_vote',
                      defaultMessage: 'downVote',
                    })}
                  />
                </>
              )}
            </a>
          </div>
        </div>
      </Table.Cell>
      <Table.Cell className=" whitespace-nowrap px-3">
        <div className="flex">
          <div className="flex items-center pl-4 text-sm text-gray-900">
            <Link href={`#`}>
              <a className="text-blue-600">
                {ProductReview?.voteReport || (
                  <>
                    {ProductReview._id}{' '}
                    <Badge
                      color="blue"
                      text={formatMessage({
                        id: 'vote_report',
                        defaultMessage: 'voteReport',
                      })}
                    />
                  </>
                )}
              </a>
            </Link>
          </div>
        </div>
      </Table.Cell>
    </Table.Row>
  );
};

export default ProductReviewListItem;
