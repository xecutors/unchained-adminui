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
      <div className="mt-2 flex border-b border-gray-200 pb-2 text-sm">
        <dl className="flex flex-wrap items-center gap-1">
          <dt className="hidden capitalize text-gray-500 sm:block">
            {formatMessage({
              id: 'order_number',
              defaultMessage: 'Order#',
            })}
            &nbsp;
          </dt>
          <dd className="inline-flex text-lg font-medium text-gray-900 sm:text-xl sm:font-bold">
            <span className="sm:hidden">&#35;&nbsp;</span>
            {order.orderNumber ? (
              <Badge
                text={order.orderNumber}
                className="p-0 text-lg font-medium sm:p-1 sm:text-xl sm:font-bold "
              />
            ) : (
              <Badge
                text="Cart"
                color="yellow"
                className="p-0 text-lg font-medium sm:p-1 sm:text-xl sm:font-bold"
              />
            )}
          </dd>
          <dt>
            <span className="sr-only">
              {formatMessage({ id: 'date', defaultMessage: 'Date' })}
            </span>
          </dt>
          <dd className="font-medium text-gray-900">
            {order?.ordered ? formatDateTime(order.ordered) : null}
          </dd>
        </dl>
        <div className="ml-auto flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-gray-900 sm:text-base">
          <span>{order?.country?.flagEmoji}</span>
          <span>
            {new Intl.DisplayNames([locale], {
              type: 'currency',
            }).of(order?.currency?.isoCode)}
          </span>
          <span>
            {order?.currency?.isoCode && (
              <Badge
                text={order?.currency?.isoCode}
                color="amber"
                className="px-2 py-0 sm:py-1"
                square
              />
            )}
          </span>
        </div>
      </div>
    </section>
  );
};

export default OrderDetailHeader;
