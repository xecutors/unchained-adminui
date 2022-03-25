import { format } from 'date-fns';
import Image from 'next/image';

import Link from 'next/link';
import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';
import Table from '../../common/components/Table';
import defaultNextImageLoader from '../../common/utils/defaultNextImageLoader';
import { useFormatPrice } from '../../common/utils/utils';

const ORDER_STATUSES = {
  OPEN: 'purple',
  PENDING: 'blue',
  CONFIRMED: 'lime',
  FULLFILLED: 'green',
};

const OrderListItem = ({ order, showUser }) => {
  const { formatMessage } = useIntl();
  const { formatPrice } = useFormatPrice();

  return (
    <Table.Row>
      <Table.Cell>
        <div className="flex items-center text-sm text-gray-900">
          <Link href={`/orders/${order._id}`}>
            <a className="text-blue-600">
              {order?.orderNumber || (
                <>
                  {order._id}{' '}
                  <Badge
                    color="yellow"
                    text={formatMessage({ id: 'cart', defaultMessage: 'Cart' })}
                  />
                </>
              )}
            </a>
          </Link>
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="flex items-center pl-2 text-sm text-gray-500">
          {order.ordered ? format(new Date(order.ordered), 'Pp') : 'n/a'}
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="flex items-center pl-2 text-sm text-gray-500">
          {formatPrice(order.total)}
        </div>
      </Table.Cell>
      {showUser && order.user && (
        <Table.Cell>
          <Link href={`/order/${order.user._id}`}>
            <a className="flex text-blue-500">
              <Image
                loader={defaultNextImageLoader}
                src={order.user?.avatar?.url || 'product_placeholder.png'}
                width={60}
                height={30}
                onError={() => '/product_placeholder.png'}
                placeholder="blur"
                blurDataURL="/product_placeholder.png"
              />
              <span className="ml-2 self-end">{order.user?.username}</span>
            </a>
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
