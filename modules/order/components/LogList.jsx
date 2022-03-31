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
        <Table className="mt-0 min-w-full rounded-t-none">
          {(logs || [])?.map((log) => (
            <Table.Row key={log._id} header>
              <Table.Cell>
                {formatMessage({
                  id: 'log_created',
                  defaultMessage: 'Created',
                })}
              </Table.Cell>

              <Table.Cell>
                {formatMessage({
                  id: 'log_level',
                  defaultMessage: 'Level',
                })}
              </Table.Cell>

              <Table.Cell>
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
                <Table.Cell className="whitespace-nowrap px-6">
                  <div className="flex items-center text-sm text-slate-900">
                    {log.created ? formatDateTime(log.created) : 'n/a'}
                    {user.username !== log.user?.username ? (
                      <Badge
                        text={log.user?.username}
                        color="pink"
                        className="ml-2 rounded-full py-1 text-sm font-semibold leading-5"
                        square
                      />
                    ) : null}
                  </div>
                </Table.Cell>

                <Table.Cell className="whitespace-normal px-6">
                  <div className="flex items-center text-sm text-slate-900">
                    {log.level ? log.level : 'N/A'}
                  </div>
                </Table.Cell>

                <Table.Cell classes="px-6 whitespace-normal">
                  <div className="flex items-center text-sm text-slate-900">
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
