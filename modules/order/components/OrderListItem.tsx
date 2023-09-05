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
    <Table.Row>
      <Table.Cell>
        <div className="flex items-center text-sm">
          <Link
            href={`/orders/${order._id}`}
            className="font-medium text-blue-500 dark:text-blue-400"
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
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="flex items-center text-sm">
          {formatDateTime(order.ordered, {
            dateStyle: 'short',
            timeStyle: 'short',
          })}
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="flex items-center text-sm">
          {formatPrice(order.total)}
        </div>
      </Table.Cell>
      {showUser && order.user && (
        <Table.Cell>
          <Link
            href={`/users/${order.user._id}`}
            className="flex items-center text-sm text-blue-500 dark:text-blue-400 hover:text-decoration"
          >
            <MediaAvatar file={order.user?.avatar} className="mr-2" />

            <span className="font-medium ml-2">
              {formatUsername(order.user)}
            </span>
          </Link>
        </Table.Cell>
      )}
      <Table.Cell>
        <Badge
          text={order?.status}
          color={ORDER_STATUSES[order.status]}
          square
        />
      </Table.Cell>
    </Table.Row>
  );
};

export default OrderListItem;
