import { Fragment } from 'react';
import { useIntl } from 'react-intl';

import Table from '../../common/components/Table';
import Badge from '../../common/components/Badge';
import NoData from '../../common/components/NoData';
import useFormatDateTime from '../../common/utils/useFormatDateTime';

const LogList = ({ logs, user }) => {
  const { formatMessage } = useIntl();
  const { formatDateTime } = useFormatDateTime();

  return (
    <section className="my-3">
      {logs?.length ? (
        <Table className="min-w-full mt-0 rounded-t-none">
          {(logs || [])?.map((log) => (
            <Table.Row key={log._id} className="bg-white " header>
              <Table.Cell className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                    {log.created ? formatDateTime(log.created) : 'n/a'}
                    {user.username !== log.user?.username ? (
                      <Badge
                        text={log.user?.username}
                        color="pink"
                        className="py-1 ml-2 text-sm leading-5 font-semibold rounded-full"
                        square
                      />
                    ) : null}
                  </div>
                </Table.Cell>

                <Table.Cell className="px-6 whitespace-nowrap ">
                  <div className="pl-2 flex items-center text-sm text-gray-900">
                    {log.level ? log.level : 'N/A'}
                  </div>
                </Table.Cell>

                <Table.Cell className="px-6  whitespace-nowrap ">
                  <div className="pl-2 flex items-center text-sm text-gray-900">
                    {log.message ? log.message : 'N/A'}
                  </div>
                </Table.Cell>
              </Table.Row>
            </Fragment>
          ))}
        </Table>
      ) : (
        <NoData
          message={formatMessage({
            id: 'logs',
            defaultMessage: 'Logs',
          })}
        />
      )}
    </section>
  );
};

export default LogList;
