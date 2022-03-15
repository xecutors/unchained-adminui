import Link from 'next/link';
import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';
import MediaAvatar from '../../common/components/MediaAvatar';
import Table from '../../common/components/Table';

// const PRODUCT_STATUS = {
//   DRAFT: 'yellow',
//   ACTIVE: 'green',
//   DELETED: 'red',
// };

const ProductReviewListItem = ({ ProductReview, showAvatar }) => {

 
  const { formatMessage } = useIntl();
//   const { slug = '' } = product?.texts || {};
  return (
    <Table.Row>
      <Table.Cell className="px-6  whitespace-nowrap ">
        <div className="pl-2 flex items-center text-sm text-gray-900">
        
           {showAvatar && (
            <MediaAvatar
              file={ProductReview.product?.media?.file && ProductReview.product.media.file}
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
                    text={formatMessage({ id: 'product', defaultMessage: 'product' })}
                  />
                </>
              )}
            </a>
          </Link> 
        </div>
      </Table.Cell>
      
      <Table.Cell className="px-6  whitespace-nowrap">
      <Link href={`#`}>
      <a className="text-blue-600">
              {ProductReview?. author.username|| (
                <>
                  {ProductReview._id}{' '}
                  <Badge
                    color="blue"
                    text={formatMessage({ id: 'author', defaultMessage: 'author' })}
                  />
                </>
              )}
            </a>
            </Link>
      </Table.Cell>

      <Table.Cell className=" px-6   whitespace-nowrap">
        <div className="flex">
          <div className="pl-2 flex items-center text-sm text-gray-900">
          <Link href={`#`}>
          <a className="text-blue-600">
              {ProductReview?. rating  || (
                <>
                  {ProductReview._id}{' '}
                  <Badge
                    color="blue"
                    text={formatMessage({ id: 'rating', defaultMessage: 'rating' })}
                  />
                </>
              )}
            </a>
            </Link>
          </div>
        </div>
      </Table.Cell>
      <Table.Cell className=" px-6   whitespace-nowrap">
        <div className="flex">
          <div className="pl-2 flex items-center text-sm text-gray-900">
          <Link href={`#`}>
          <a className="text-blue-600">
              {ProductReview?. created  || (
                <>
                  {ProductReview._id}{' '}
                  <Badge
                    color="blue"
                    text={formatMessage({ id: 'created', defaultMessage: 'created' })}
                  />
                </>
              )}
            </a>
            </Link>
          </div>
        </div>
      </Table.Cell>
      <Table.Cell className=" px-6   whitespace-nowrap">
        <div className="flex">
          <div className="pl-2 flex items-center text-sm text-gray-900">
          <Link href={`#`}>
          <a className="text-blue-600">
              {ProductReview?. title  || (
                <>
                  {ProductReview._id}{' '}
                  <Badge
                    color="blue"
                    text={formatMessage({ id: 'title', defaultMessage: 'title' })}
                  />
                </>
              )}
            </a>
            </Link>
          </div>
        </div>
      </Table.Cell>
      <Table.Cell className=" px-6   whitespace-nowrap">
        <div className="flex">
          <div className="pl-2 flex items-center text-sm text-gray-900">
          <Link href={`#`}>
          <a className="text-blue-600">
              {ProductReview?. upVote  || (
                <>
                  {ProductReview._id}{' '}
                  <Badge
                    color="blue"
                    text={formatMessage({ id: 'upVote', defaultMessage: 'upVote' })}
                  />
                </>
              )}
            </a>
            </Link>
          </div>
        </div>
      </Table.Cell>
      <Table.Cell className=" px-6   whitespace-nowrap">
        <div className="flex">
          <div className="pl-2 flex items-center text-sm text-gray-900">
          <Link href={`#`}>
          <a className="text-blue-600">
              {ProductReview?. downVote  || (
                <>
                  {ProductReview._id}{' '}
                  <Badge
                    color="blue"
                    text={formatMessage({ id: 'downVote', defaultMessage: 'downVote' })}
                  />
                </>
              )}
            </a>
            </Link>
          </div>
        </div>
      </Table.Cell>
      <Table.Cell className=" px-6   whitespace-nowrap">
        <div className="flex">
          <div className="pl-2 flex items-center text-sm text-gray-900">
          
          <a className="text-blue-600">
              {ProductReview?. voteReport  || (
                <>
                  {ProductReview._id}{' '}
                  <Badge
                    color="blue"
                    text={formatMessage({ id: 'voteReport', defaultMessage: 'voteReport' })}
                  />
                </>
              )}
            </a>
          </div>
        </div>
      </Table.Cell>
    </Table.Row>
  );
};

export default ProductReviewListItem;
