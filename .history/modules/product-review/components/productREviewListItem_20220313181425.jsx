import { format } from 'date-fns';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';
import MediaAvatar from '../../common/components/MediaAvatar';
import Table from '../../common/components/Table';

// const QUOTATION_STATUS = {
//   REQUESTED: 'orange',
//   PROCESSING: 'yellow',
//   PROPOSED: 'cyan',
//   REJECTED: 'red',
//   FULLFILLED: 'green',
// };

const productReviewListItem = ({ productReview,showAvatar }) => {
  const { formatMessage } = useIntl();
  return (
    <Table.Row>
      <Table.Cell className="px-6  whitespace-nowrap ">
        <div className="pl-2 flex items-center text-sm text-gray-900">
        {showAvatar && (
            <MediaAvatar
              file={product?.media?.length && product.media[0].file}
              className="mr-2"
            />
          )}
          <Link href={`/quotations/${quotation._id}`}>
            <a className="text-blue-600">
              {quotation?.orderNumber || quotation._id?.substr(0, 10)}
            </a>
          </Link>
        </div>
      </Table.Cell>

      <Table.Cell className="px-6  whitespace-nowrap ">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          {format(new Date(quotation.created), 'P')}
        </div>
      </Table.Cell>

      <Table.Cell className="px-6  whitespace-nowrap ">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          {quotation.expires ? format(new Date(quotation.expires), 'P') : 'n/a'}

          {!quotation.isExpired && (
            <Badge
              className="ml-1"
              text={formatMessage({
                id: 'expired',
                defaultMessage: 'Expired',
              })}
              color="red"
            />
          )}
        </div>
      </Table.Cell>

      {/* {showUser && quotation.user && ( */}
      <Table.Cell className="px-6  whitespace-nowrap ">
        {/* <Link href={`/users/${quotation.user._id}`}>
          <a className="flex text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>{' '}
            {quotation.user?.username}
          </a>
        </Link> */}
      </Table.Cell>
      {/* )} */}

      <Table.Cell className="px-6  whitespace-nowrap ">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          <Link href={`/products/${quotation.plan.product._id}`}>
            <a className="text-blue-600">
              {quotation?.plan.product.texts.title}
            </a>
          </Link>
        </div>
      </Table.Cell>

      <Table.Cell className="px-6  whitespace-nowrap ">
        <Badge
          text={quotation?.status}
          color={QUOTATION_STATUS[quotation.status]}
          square
        />
      </Table.Cell>
    </Table.Row>
  );
};

export default QuotationListItem;
