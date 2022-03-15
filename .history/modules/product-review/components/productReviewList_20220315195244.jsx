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
              id: 'created',
              defaultMessage: 'created',
            })}
          </Table.Cell>
          <Table.Cell className=" text-left text-xs font-medium text-gray-500  uppercase tracking-wider">
            {formatMessage({
              id: 'title',
              defaultMessage: 'title',
            })}
          </Table.Cell>
          <Table.Cell className=" text-left text-xs font-medium text-gray-500  uppercase tracking-wider">
            {/* {formatMessage({
              id: 'upVote',
              defaultMessage: 'upVote',
            })} */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
</svg>
          </Table.Cell>
          <Table.Cell className=" text-left text-xs font-medium text-gray-500  uppercase tracking-wider">
            {/* {formatMessage({
              id: 'downVote',
              defaultMessage: 'downVote',
            })} */}
         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
</svg>
          </Table.Cell>
          <Table.Cell className=" text-left text-xs font-medium text-gray-500  uppercase tracking-wider">
            {formatMessage({
              id: 'voteReport',
              defaultMessage: 'voteReport',
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
