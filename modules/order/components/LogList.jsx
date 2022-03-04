import { Fragment } from 'react';
import { useIntl } from 'react-intl';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';

import Table from '../../common/components/Table';
import Badge from '../../common/components/Badge';
import NoData from '../../common/components/NoData';
import { formatDateTime } from '../../common/utils/utils';

const LogList = ({ logs, user }) => {
  const { formatMessage } = useIntl();

  return (
    <section className="my-3">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="inline-flex items-center justify-between w-full px-4 py-2 rounded-t-md border border-gray-300 bg-grey-100 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
              <span>Logs</span>
              <ChevronUpIcon
                className={`${open ? 'transform rotate-180' : ''} w-5 h-5`}
                aria-hidden="true"
              />
            </Disclosure.Button>
            <Disclosure.Panel>
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
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </section>
  );
};

export default LogList;
