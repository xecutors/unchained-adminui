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
            href={`/orders?orderId=${order._id}`}
            className="font-medium text-slate-800 dark:text-slate-700"
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
            href={`/users?userId=${order.user._id}`}
            className="flex items-center text-sm text-slate-800 dark:text-slate-700 hover:text-decoration"
          >
            <MediaAvatar file={order.user?.avatar} className="mr-3" />

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
