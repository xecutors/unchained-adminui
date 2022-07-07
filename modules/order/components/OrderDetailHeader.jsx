import { useIntl } from 'react-intl';
import useFormatDateTime from '../../common/utils/useFormatDateTime';
import Badge from '../../common/components/Badge';
import DetailHeader from '../../common/components/DetailHeader';
import { normalizeCurrencyISOCode } from '../../common/utils/utils';

const OrderDetailHeader = ({ order }) => {
  const { formatMessage, locale } = useIntl();
  const { formatDateTime } = useFormatDateTime();

  return (
    <div className="bg-white dark:bg-slate-600 rounded-md shadow dark:shadow-white p-4 space-y-5 ">
      <div className="flex items-center justify-between">
        <span className="text-sm block mr-3">
          {formatMessage({
            id: 'order_number',
            defaultMessage: 'Order #',
          })}
          &nbsp;
        </span>
        <span className="inline-flex text-lg font-medium text-slate-900 dark:text-white sm:text-xl sm:font-bold">
          <span className="sm:hidden">&#35;&nbsp;</span>
          {order?.orderNumber ? (
            <Badge
              text={order.orderNumber}
              square
              color="indigo"
              className="text-lg font-medium sm:text-xl sm:font-bold "
            />
          ) : (
            <Badge
              text={formatMessage({ id: 'cart', defaultMessage: 'Cart' })}
              color="yellow"
              className="text-lg font-medium sm:text-xl sm:font-bold"
            />
          )}
        </span>
      </div>
      <DetailHeader user={order?.user} contact={order?.contact} />
      <div className="flex justify-between">
        <div>
          <span className="text-sm mr-3">
            {formatMessage({ id: 'date', defaultMessage: 'Date' })}
          </span>
          {order?.ordered ? formatDateTime(order.ordered) : null}
        </div>
        <div className="">
          <span>{order?.country?.flagEmoji}</span>
          <span className="mr-1">
            {normalizeCurrencyISOCode(locale, order?.currency?.isoCode)}
          </span>
          <span>
            {order?.currency?.isoCode && (
              <Badge text={order?.currency?.isoCode} color="amber" square />
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailHeader;
