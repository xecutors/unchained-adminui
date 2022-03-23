import { useIntl } from 'react-intl';

import NoData from '../../common/components/NoData';
import Badge from '../../common/components/Badge';
import Table from '../../common/components/Table';
import useFormatDateTime from '../../common/utils/useFormatDateTime';

const SubscriptionList = ({ periods }) => {
  const { formatMessage } = useIntl();
  const { formatDateTime } = useFormatDateTime();

  return (
    <section className="my-3">
      {periods?.length ? (
        <Table className="mt-0 min-w-full rounded-t-none">
          {(periods || [])?.map((period) => (
            <Table.Row
              key={`${period.start}${period.end}`}
              className="bg-white "
              header
            >
              <Table.Cell className="text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                {formatMessage({
                  id: 'order',
                  defaultMessage: 'Order',
                })}
              </Table.Cell>

              <Table.Cell className="text-left text-xs font-medium  uppercase tracking-wider text-gray-500">
                {formatMessage({
                  id: 'start',
                  defaultMessage: 'Start',
                })}
              </Table.Cell>

              <Table.Cell className="text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                {formatMessage({
                  id: 'end',
                  defaultMessage: 'end',
                })}
              </Table.Cell>
            </Table.Row>
          ))}

          {(periods || [])?.map((period) => (
            <Table.Row key={`${period.start}`}>
              <Table.Cell className="whitespace-nowrap  px-6 ">
                <div className="flex items-center pl-2 text-sm text-gray-900">
                  {period?.order?.orderNumber
                    ? period?.order?.orderNumber
                    : 'N/A'}
                  {period?.isTrial && (
                    <Badge
                      text="Trial"
                      color="pink"
                      className="ml-2 rounded-full py-1 text-sm font-semibold leading-5"
                      square
                    />
                  )}
                </div>
              </Table.Cell>

              <Table.Cell className="whitespace-nowrap  px-6 ">
                <div className="flex items-center pl-2 text-sm text-gray-900">
                  {period?.start ? formatDateTime(period?.start) : 'n/a'}
                </div>
              </Table.Cell>

              <Table.Cell className="whitespace-nowrap px-6 ">
                <div className="flex items-center pl-2 text-sm text-gray-900">
                  {period?.end ? formatDateTime(period?.end) : 'n/a'}
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table>
      ) : (
        <NoData
          message={formatMessage({
            id: 'subscription_message',
            defaultMessage: 'Subscription',
          })}
        />
      )}
    </section>
  );
};

export default SubscriptionList;
