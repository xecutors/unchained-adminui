import { useIntl } from 'react-intl';
import Table from '../../common/components/Table';
import ProductReviewListItem from './productReviewListItem';

const ProductReviewList = ({ ProductReview, showAvatar = true }) => {
  const { formatMessage } = useIntl();
  {
    "id"; 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "johndoe@abc.com",
    "gender": "Male",
    "status": "Terminated"
  },
  return (
    <Table className="min-w-full ">
      {ProductReview?.map((ProductReview) => (
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
        </Table.Row>
      ))}

      {ProductReview?.map((ProductReview) => (
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
