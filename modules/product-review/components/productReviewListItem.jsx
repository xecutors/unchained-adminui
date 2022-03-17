import Link from 'next/link';
import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';
import MediaAvatar from '../../common/components/MediaAvatar';
import Table from '../../common/components/Table';

const USER_STATUS = {
  DELETED: 'red',
  isGuest: 'red',
};

const ProductReviewListItem = ({ ProductReview, showAvatar }) => {
  const { formatMessage } = useIntl();
  //   const { slug = '' } = product?.texts || {};
  return (
    <Table.Row>
      <Table.Cell className="whitespace-nowrap  px-6 ">
        <div className="flex items-center pl-2 text-sm text-gray-900">
          {showAvatar && (
            <MediaAvatar
              file={
                ProductReview.product?.media?.file &&
                ProductReview.product.media.file
              }
              className="mr-2"
            />
          )}
          <Link href={`#`}>
            <a className="text-blue-600">
              {ProductReview?.product.texts.title || (
                <>
                  {ProductReview._id}{' '}
                  <Badge
                    color="blue"
                    text={formatMessage({
                      id: 'product',
                      defaultMessage: 'product',
                    })}
                  />
                </>
              )}
            </a>
          </Link>
        </div>
      </Table.Cell>

      <Table.Cell className=" whitespace-nowrap px-6">
        <div className="flex">
          {showAvatar && (
            <MediaAvatar
              file={
                ProductReview.author?.avatar && ProductReview.author?.avatar
              }
              className="mx-2"
            />
          )}
          <Link href={`#`}>
            <a className="mt-4 whitespace-nowrap px-2 text-blue-600">
              {ProductReview?.author.username || (
                <>
                  {ProductReview._id}{' '}
                  <Badge
                    color="blue"
                    text={formatMessage({
                      id: 'author',
                      defaultMessage: 'author',
                    })}
                  />
                </>
              )}
              {ProductReview.author.isGuest && (
                <Badge
                  className="mb- ml-4 p-1"
                  text={formatMessage({
                    id: 'Guest',
                    defaultMessage: 'Guest',
                  })}
                  color="red"
                />
              )}
            </a>
          </Link>
        </div>
      </Table.Cell>

      <Table.Cell className=" whitespace-nowrap   px-6">
        <div className="flex">
          <div className="flex items-center pl-2 text-sm text-gray-900">
            <Link href={`#`}>
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
            </Link>
          </div>
        </div>
      </Table.Cell>
      <Table.Cell className=" whitespace-nowrap   px-6">
        <div className="flex">
          <div className="flex items-center pl-2 text-sm text-gray-900">
            <Link href={`#`}>
              <a className="text-blue-600">
                {ProductReview?.created || (
                  <>
                    {ProductReview._id}{' '}
                    <Badge
                      color="blue"
                      text={formatMessage({
                        id: 'created',
                        defaultMessage: 'created',
                      })}
                    />
                  </>
                )}
              </a>
            </Link>
          </div>
        </div>
      </Table.Cell>
      <Table.Cell className=" whitespace-nowrap   px-6">
        <div className="flex">
          <div className="flex items-center pl-2 text-sm text-gray-900">
            <Link href={`#`}>
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
            </Link>
          </div>
        </div>
      </Table.Cell>
      <Table.Cell className=" whitespace-nowrap   px-6">
        <div className="flex">
          <div className="flex items-center pl-2 text-sm text-gray-900">
            <Link href={`#`}>
              <a className="text-blue-600">
                {ProductReview?.upVote || (
                  <>
                    {ProductReview._id}{' '}
                    <Badge
                      color="blue"
                      text={formatMessage({
                        id: 'upVote',
                        defaultMessage: 'upVote',
                      })}
                    />
                  </>
                )}
              </a>
            </Link>
          </div>
        </div>
      </Table.Cell>
      <Table.Cell className=" whitespace-nowrap   px-6">
        <div className="flex">
          <div className="flex items-center pl-2 text-sm text-gray-900">
            <Link href={`#`}>
              <a className="text-blue-600">
                {ProductReview?.downVote || (
                  <>
                    {ProductReview._id}{' '}
                    <Badge
                      color="blue"
                      text={formatMessage({
                        id: 'downVote',
                        defaultMessage: 'downVote',
                      })}
                    />
                  </>
                )}
              </a>
            </Link>
          </div>
        </div>
      </Table.Cell>
      <Table.Cell className=" whitespace-nowrap   px-6">
        <div className="flex">
          <div className="flex items-center pl-2 text-sm text-gray-900">
            <Link href={`#`}>
              <a className="text-blue-600">
                {ProductReview?.voteReport || (
                  <>
                    {ProductReview._id}{' '}
                    <Badge
                      color="blue"
                      text={formatMessage({
                        id: 'voteReport',
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
