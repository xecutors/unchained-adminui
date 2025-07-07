import Link from 'next/link';
import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';
import MediaAvatar from '../../common/components/MediaAvatar';
import Table from '../../common/components/Table';
import { ORDER_STATUSES } from '../../common/data/miscellaneous';
import formatUsername from '../../common/utils/formatUsername';
import useFormatDateTime from '../../common/utils/useFormatDateTime';
import { useFormatPrice } from '../../common/utils/utils';

const OrderListItem = ({ order, showUser }) => {
  const { formatMessage } = useIntl();
  const { formatPrice } = useFormatPrice();
  const { formatDateTime } = useFormatDateTime();
  return (
    <Table.Row className="group">
      <Table.Cell>
        <Link
          href={`/orders?orderId=${order._id}`}
          className="flex items-center text-sm font-medium text-slate-800 dark:text-slate-700 group-hover:text-slate-900 dark:group-hover:text-slate-600"
        >
          {order?.orderNumber || (
            <>
              {order._id}{' '}
              <Badge
                color="yellow"
                text={formatMessage({ id: 'cart', defaultMessage: 'Cart' })}
              />
            </>
          )}
        </Link>
      </Table.Cell>
      <Table.Cell>
        <Link
          href={`/orders?orderId=${order._id}`}
          className="flex items-center text-sm"
        >
          {formatDateTime(order.ordered, {
            dateStyle: 'short',
            timeStyle: 'short',
          })}
        </Link>
      </Table.Cell>
      <Table.Cell>
        <Link
          href={`/orders?orderId=${order._id}`}
          className="flex items-center text-sm"
        >
          {formatPrice(order.total)}
        </Link>
      </Table.Cell>
      {showUser && order.user && (
        <Table.Cell>
          <Link
            href={`/users?userId=${order.user._id}`}
            className="flex items-center text-sm text-slate-800 dark:text-slate-700 hover:text-decoration"
            onClick={(e) => e.stopPropagation()}
          >
            <MediaAvatar file={order.user?.avatar} className="mr-3" />

            <span className="font-medium ml-2">
              {formatUsername(order.user)}
            </span>
          </Link>
        </Table.Cell>
      )}
      <Table.Cell>
        <Link href={`/orders?orderId=${order._id}`} className="block">
          <Badge
            text={
              order?.status === 'CONFIRMED' 
                ? formatMessage({ id: 'confirmed', defaultMessage: 'CONFIRMED' })
                : order?.status === 'PENDING' 
                ? formatMessage({ id: 'pending', defaultMessage: 'PENDING' })
                : order?.status === 'OPEN' 
                ? formatMessage({ id: 'open', defaultMessage: 'OPEN' })
                : order?.status === 'FULLFILLED' 
                ? formatMessage({ id: 'fulfilled', defaultMessage: 'FULFILLED' })
                : order?.status === 'REJECTED' 
                ? formatMessage({ id: 'rejected', defaultMessage: 'REJECTED' })
                : order?.status
            }
            color={ORDER_STATUSES[order.status]}
            square
            className="uppercase"
          />
        </Link>
      </Table.Cell>
    </Table.Row>
  );
};

export default OrderListItem;
