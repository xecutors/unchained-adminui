import { useIntl } from 'react-intl';
import Pagination from '../../common/components/Pagination';
import useUserLogs from '../hooks/useUserLogs';

import UserLogListItem from './UserLogListItem';

const UserLogs = ({ _id: userId }) => {
  const { logs } = useUserLogs({ userId });

  const { formatMessage } = useIntl();

  return (
    <div>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border-b border-gray-200 shadow ">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    {formatMessage({
                      id: 'date',
                      defaultMessage: 'Date',
                    })}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    {formatMessage({
                      id: 'level',
                      defaultMessage: 'Level',
                    })}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    {formatMessage({
                      id: 'message',
                      defaultMessage: 'Message',
                    })}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    {formatMessage({
                      id: 'context',
                      defaultMessage: 'Context',
                    })}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {logs?.map((log) => (
                  <UserLogListItem key={log?._id} log={log} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination
        onLoadMore={() => {}}
        data={logs}
        total={logs?.length}
        onLimitChange={() => {}}
      />
    </div>
  );
};

export default UserLogs;
