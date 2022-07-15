import Image from 'next/image';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';
import Table from '../../common/components/Table';
import defaultNextImageLoader from '../../common/utils/defaultNextImageLoader';
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
        <div className="flex items-center text-sm text-slate-900">
          <Link href={`/quotations/${quotation?._id}`}>
            <a className="text-blue-600 dark:text-blue-400">
              {quotation?.orderNumber || quotation?._id?.substr(0, 10)}
            </a>
          </Link>
        </div>
      </Table.Cell>

      <Table.Cell>
        <div className="flex items-center text-sm text-slate-900">
          {formatDateTime(quotation.created, {
            dateStyle: 'short',
            timeStyle: 'short',
          })}
        </div>
      </Table.Cell>

      <Table.Cell>
        <div className="flex items-center text-sm text-slate-900">
          {formatDateTime(quotation?.expires, {
            dateStyle: 'short',
            timeStyle: 'short',
          })}

          {!quotation?.isExpired && (
            <Badge
              className="ml-1 p-1"
              text={formatMessage({
                id: 'expired',
                defaultMessage: 'Expired',
              })}
              color="red"
            />
          )}
        </div>
      </Table.Cell>
      {showUser && (
        <Table.Cell>
          <Link href={`/users/${quotation.user?._id}`}>
            <a className="flex text-blue-500 dark:text-blue-400">
              <Image
                loader={defaultNextImageLoader}
                src={quotation.user?.avatar?.url}
                width={40}
                height={20}
                placeholder="blur"
                blurDataURL="/placeholder.png"
              />
              <span className="ml-2 self-end">{quotation.user?.username}</span>
            </a>
          </Link>
        </Table.Cell>
      )}

      <Table.Cell>
        <div className="flex items-center text-sm text-slate-900">
          <Link href={`/products/${quotation?.product?._id}`}>
            <a className="flex text-blue-600 dark:text-blue-400">
              <Image
                loader={defaultNextImageLoader}
                src={quotation?.product?.media?.file.url}
                width={40}
                height={20}
                placeholder="blur"
                blurDataURL="/placeholder.png"
              />
              <span className="ml-2 self-end">
                {quotation?.product?.texts?.title}
              </span>
            </a>
          </Link>
        </div>
      </Table.Cell>

      <Table.Cell>
        <Badge
          text={quotation?.status}
          color={QUOTATION_STATUS[quotation?.status]}
          square
        />
      </Table.Cell>
    </Table.Row>
  );
};

export default QuotationListItem;
