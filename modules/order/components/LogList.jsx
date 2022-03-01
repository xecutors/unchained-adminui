import { Fragment } from 'react';
import { useIntl } from 'react-intl';
import Table from '../../common/components/Table';
import formatDateTime from '../../common/utils/formatDateTime';

const LogList = ({ logs }) => {
  const { formatMessage } = useIntl();

  return (
    <section>
      <Table className="min-w-full ">
        {(logs || [])?.map((log) => (
          <Table.Row key={log._id} className="bg-white " header>
            <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
              {formatMessage({
                id: 'log_created',
                defaultMessage: 'Created',
              })}
            </Table.Cell>

            <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
              {formatMessage({
                id: 'log_level',
                defaultMessage: 'Level',
              })}
            </Table.Cell>

            <Table.Cell className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              {formatMessage({
                id: 'log_message',
                defaultMessage: 'Message',
              })}
            </Table.Cell>
          </Table.Row>
        ))}

        {(logs || [])?.map((log) => (
          <Fragment key={log._id}>
            <Table.Row>
              <Table.Cell className="px-6  whitespace-nowrap ">
                <div className="pl-2 flex items-center text-sm text-gray-900">
                  {log.created
                    ? formatDateTime(log.created, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : 'n/a'}
                </div>
              </Table.Cell>

              <Table.Cell className="px-6  whitespace-nowrap ">
                <div className="pl-2 flex items-center text-sm text-gray-900">
                  {log.level ? log.level : ''}
                </div>
              </Table.Cell>

              <Table.Cell className="px-6  whitespace-nowrap ">
                <div className="pl-2 flex items-center text-sm text-gray-900">
                  {log.message ? log.message : ''}
                </div>
                {/* <Badge
          text={order?.status}
          color={ORDER_STATUSES[order.status]}
          square
        /> */}
              </Table.Cell>
            </Table.Row>
          </Fragment>
        ))}
      </Table>
    </section>
  );
};

export default LogList;
