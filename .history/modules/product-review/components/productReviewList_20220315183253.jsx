import { useIntl } from 'react-intl';
import Table from '../../common/components/Table';
import ProductReviewListItem from './productReviewListItem';

const ProductReviewList = ({ productReviews, showAvatar = true }) => {
  const { formatMessage } = useIntl();
 
  return (
    <Table className="min-w-full ">
      {productReviews?.map((ProductReview) => (
        <Table.Row key={ProductReview._id} className="bg-white " header>
          <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
            {formatMessage({
              id: 'product',
              defaultMessage: 'product',
            })}
          </Table.Cell>
          <Table.Cell className="pr-6  text-left text-xs font-medium sm:py-1text-gray-500 uppercase tracking-wider">
            {formatMessage({
              id: 'author',
              defaultMessage: 'author',
            })}
          </Table.Cell>

          <Table.Cell className=" text-left text-xs font-medium text-gray-500  uppercase tracking-wider">
            {formatMessage({
              id: 'rating',
              defaultMessage: 'rating',
            })}
          </Table.Cell>
          <Table.Cell className=" text-left text-xs font-medium text-gray-500  uppercase tracking-wider">
            {formatMessage({
              id: 'product',
              defaultMessage: 'rating',
            })}
          </Table.Cell>
        </Table.Row>
      ))}

      {productReviews?.map((ProductReview) => (
        <ProductReviewListItem
          key={`${ProductReview?._id}-body`}
          ProductReview={ProductReview}
          showAvatar={showAvatar}
        />
      ))}
    </Table>
  );
};

export default ProductReviewList;
