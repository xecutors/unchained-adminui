import { useIntl } from 'react-intl';
import useFormatDateTime from '../../common/utils/useFormatDateTime';
import Badge from '../../common/components/Badge';
import DetailHeader from '../../common/components/DetailHeader';

const OrderDetailHeader = ({ order }) => {
  const { formatMessage, locale } = useIntl();
  const { formatDateTime } = useFormatDateTime();

  return (
    <section>
      <DetailHeader user={order?.user} contact={order?.contact} />
      <div className="mt-2 flex pb-2">
        <div className="flex flex-wrap items-center gap-1">
          <div className="hidden text-gray-500 sm:block">
            {formatMessage({
              id: 'order_number',
              defaultMessage: 'Order#',
            })}
            &nbsp;
          </div>
          <div className="inline-flex text-lg font-medium text-gray-900 sm:text-xl sm:font-bold">
            <span className="sm:hidden">&#35;&nbsp;</span>
            {order.orderNumber ? (
              <Badge
                text={order.orderNumber}
                square
                color="indigo"
                className="text-lg font-medium sm:text-xl sm:font-bold "
              />
            ) : (
              <Badge
                text="Cart"
                color="yellow"
                className="text-lg font-medium sm:text-xl sm:font-bold"
              />
            )}
          </div>
          <div className="mt-5">
            <span className="text-md mr-5 text-gray-500">
              {formatMessage({ id: 'date', defaultMessage: 'Date' })}
            </span>
            {order?.ordered ? formatDateTime(order.ordered) : null}
          </div>
        </div>
        <div className="ml-auto flex flex-wrap gap-x-1 text-sm text-gray-900 sm:text-base">
          <span>{order?.country?.flagEmoji}</span>
          <span>
            {new Intl.DisplayNames([locale], {
              type: 'currency',
            }).of(order?.currency?.isoCode)}
          </span>
          <span>
            {order?.currency?.isoCode && (
              <Badge text={order?.currency?.isoCode} color="amber" square />
            )}
          </span>
        </div>
      </div>
    </section>
  );
};

export default OrderDetailHeader;
