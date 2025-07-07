import { useIntl } from 'react-intl';
import useFormatDateTime from '../../common/utils/useFormatDateTime';
import Badge from '../../common/components/Badge';
import DetailHeader from '../../common/components/DetailHeader';
import { normalizeCurrencyISOCode } from '../../common/utils/utils';

const OrderDetailHeader = ({ order }) => {
  const { formatMessage, locale } = useIntl();
  const { formatDateTime } = useFormatDateTime();
  if (!order) return null;
  return (
    <div>
      <div className="flex justify-between items-baseline flex-wrap mb-10">
        <div className="flex items-center justify-between gap-5 flex-wrap">
          <h2 className="text-2xl font-medium text-slate-900 dark:text-slate-200 sm:truncate sm:text-3xl lg:text-4xl xl:text-5xl">
            {formatMessage({
              id: 'order_number',
              defaultMessage: 'Order',
            })}
            {order?.orderNumber ? `${order.orderNumber}` : ''}
          </h2>
          <span id="order_number_badge" className="inline-flex">
            {!order?.orderNumber && (
              <Badge
                text={formatMessage({ id: 'cart', defaultMessage: 'Cart' })}
                color="yellow"
                className="text-lg font-medium sm:text-xl sm:font-bold"
              />
            )}
          </span>
        </div>
        <div>
          <span className="mr-1 text-slate-400 dark:text-slate-500">
            {formatMessage({
              id: 'order_placed',
              defaultMessage: 'Order placed',
            })}
          </span>
          {order?.ordered ? formatDateTime(order.ordered) : null}
        </div>
      </div>

      <DetailHeader user={order?.user} contact={order?.contact} />

      {/* <div className="mt-5 flex gap-5 justify-between">
        <div className="flex gap-1">
          <span>{order?.country?.flagEmoji}</span>
          <span className="mx-1">
            {normalizeCurrencyISOCode(locale, order?.currency?.isoCode)}
          </span>
          <span>
            {order?.currency?.isoCode && (
              <Badge text={order?.currency?.isoCode} color="slate" square />
            )}
          </span>
        </div>
      </div> */}
    </div>
  );
};

export default OrderDetailHeader;
