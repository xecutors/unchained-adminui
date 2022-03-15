import { useIntl } from 'react-intl';
import { Fragment } from 'react';
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
        <Table className="min-w-full mt-0 rounded-t-none">
          {(periods || [])?.map((period) => (
            <Table.Row key={period.order._id} className="bg-white " header>
              <Table.Cell className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {formatMessage({
                  id: 'order',
                  defaultMessage: 'Order',
                })}
              </Table.Cell>

              <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
                {formatMessage({
                  id: 'start',
                  defaultMessage: 'Start',
                })}
              </Table.Cell>

              <Table.Cell className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {formatMessage({
                  id: 'end',
                  defaultMessage: 'end',
                })}
              </Table.Cell>
            </Table.Row>
          ))}

          {(periods || [])?.map((period) => (
            <Fragment key={period.order._id}>
              <Table.Row>
                <Table.Cell className="px-6  whitespace-nowrap ">
                  <div className="pl-2 flex items-center text-sm text-gray-900">
                    {period?.order?.orderNumber
                      ? period?.order?.orderNumber
                      : 'N/A'}
                    {period?.isTrial && (
                      <Badge
                        text="Trial"
                        color="pink"
                        className="py-1 ml-2 text-sm leading-5 font-semibold rounded-full"
                        square
                      />
                    )}
                  </div>
                </Table.Cell>

                <Table.Cell className="px-6  whitespace-nowrap ">
                  <div className="pl-2 flex items-center text-sm text-gray-900">
                    {period?.start ? formatDateTime(period?.start) : 'n/a'}
                  </div>
                </Table.Cell>

                <Table.Cell className="px-6 whitespace-nowrap ">
                  <div className="pl-2 flex items-center text-sm text-gray-900">
                    {period?.end ? formatDateTime(period?.end) : 'n/a'}
                  </div>
                </Table.Cell>
              </Table.Row>
            </Fragment>
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
