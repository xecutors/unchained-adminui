import Image from 'next/image';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';
import Table from '../../common/components/Table';
import defaultNextImageLoader from '../../common/utils/defaultNextImageLoader';
import generateUniqueId from '../../common/utils/getUniqueId';
import useFormatDateTime from '../../common/utils/useFormatDateTime';

const QUOTATION_STATUS = {
  REQUESTED: 'orange',
  PROCESSING: 'yellow',
  PROPOSED: 'cyan',
  REJECTED: 'red',
  FULLFILLED: 'green',
};

const QuotationListItem = ({ quotation, showUser }) => {
  const { formatMessage } = useIntl();
  const { formatDateTime } = useFormatDateTime();
  return (
    <Table.Row>
      <Table.Cell>
        <div className="flex items-center text-sm ">
          <Link
            href={`/quotations/${quotation._id}`}
            className="font-medium text-blue-500 dark:text-blue-400"
          >
            {quotation?.quotationNumber || quotation._id?.substr(0, 10)}
          </Link>
        </div>
      </Table.Cell>

      <Table.Cell>
        <div className="flex items-center text-sm ">
          {formatDateTime(quotation.created, {
            dateStyle: 'short',
            timeStyle: 'short',
          })}
        </div>
      </Table.Cell>

      <Table.Cell>
        <div className="flex items-center text-sm ">
          {quotation.isExpired ? (
            <Badge
              text={formatMessage({
                id: 'expired',
                defaultMessage: 'Expired',
              })}
              color="red"
            />
          ) : (
            formatDateTime(quotation?.expires, {
              dateStyle: 'short',
              timeStyle: 'short',
            })
          )}
        </div>
      </Table.Cell>
      {showUser && (
        <Table.Cell>
          <Link
            href={`/users/${quotation.user._id}`}
            className="flex items-center text-sm text-blue-500 dark:text-blue-400 hover:text-decoration"
          >
            <Image
              loader={defaultNextImageLoader}
              src={quotation.user?.avatar?.url}
              width={20}
              height={20}
              placeholder="blur"
              alt={formatMessage({
                id: 'image-not-found',
                defaultMessage: 'image-not-found',
              })}
              blurDataURL="/no-image.jpg"
            />
            <span className="font-medium ml-2">{quotation.user?.username}</span>
          </Link>
        </Table.Cell>
      )}
      <Table.Cell>
        <div className="flex items-center text-sm ">
          <Link
            href={`/products/${generateUniqueId(quotation.product)}`}
            className="flex text-blue-600 dark:text-blue-400"
          >
            <Image
              loader={defaultNextImageLoader}
              src={quotation.product?.media[0]?.file?.url}
              width={20}
              height={20}
              placeholder="blur"
              blurDataURL="/no-image.jpg"
              alt={formatMessage({
                id: 'image-not-found',
                defaultMessage: 'image-not-found',
              })}
            />
            <span className="ml-2 self-end">
              {quotation?.product.texts.title}
            </span>
          </Link>
        </div>
      </Table.Cell>

      <Table.Cell>
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
