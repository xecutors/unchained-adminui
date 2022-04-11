import { format } from 'date-fns';
import Image from 'next/image';

import Link from 'next/link';
import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';
import Table from '../../common/components/Table';
import { ORDER_STATUSES } from '../../common/data/miscellaneous';
import defaultNextImageLoader from '../../common/utils/defaultNextImageLoader';
import { useFormatPrice } from '../../common/utils/utils';

const OrderListItem = ({ order, showUser }) => {
  const { formatMessage } = useIntl();
  const { formatPrice } = useFormatPrice();

  return (
    <Table.Row>
      <Table.Cell>
        <div className="flex items-center text-sm">
          <Link href={`/orders/${order._id}`}>
            <a className="font-medium text-blue-500 dark:text-blue-400">
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
        <div className="flex items-center text-sm">
          {order.ordered
            ? format(new Date(order.ordered), 'yyyy-MM-dd HH:mm')
            : 'n/a'}
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="flex items-center text-sm">
          {formatPrice(order.total)}
        </div>
      </Table.Cell>
      {showUser && order.user && (
        <Table.Cell>
          <Link href={`/order/${order.user._id}`}>
            <a className="flex items-center text-sm text-blue-500 dark:text-blue-400 hover:text-decoration">
              <Image
                loader={defaultNextImageLoader}
                src={order.user?.avatar?.url || 'product_placeholder.png'}
                width={20}
                height={20}
                onError={() => '/product_placeholder.png'}
                placeholder="blur"
                blurDataURL="/product_placeholder.png"
              />
              <span className="font-medium ml-2">{order.user?.username}</span>
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
