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
    <Table.Row className="text-sm font-medium text-slate-500">
      <Table.Cell>
        <Link href={`/orders/${order._id}`}>
          <a className=" text-blue-500">
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
      </Table.Cell>
      <Table.Cell>
        {order.ordered
          ? format(new Date(order.ordered), 'yyyy-MM-dd HH:mm')
          : 'n/a'}
      </Table.Cell>
      <Table.Cell>{formatPrice(order.total)}</Table.Cell>
      {showUser && order?.user && (
        <Table.Cell>
          <Link href={`/order/${order.user._id}`}>
            <a className="flex items-center text-sm text-blue-500 ">
              <Image
                loader={defaultNextImageLoader}
                src={order.user?.avatar?.url || 'product_placeholder.png'}
                width={20}
                height={20}
                onError={() => '/product_placeholder.png'}
                placeholder="blur"
                blurDataURL="/product_placeholder.png"
              />
              <span className="ml-2">{order.user?.username}</span>
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
