import { useIntl } from 'react-intl';
import ListPagination from '../../common/components/ListPagination';

import UserLogListItem from './UserLogListItem';

const logs = [
  {
    _id: 'FABDe8Hy7q7HjLjAD',
    created: 1642529343350,
    level: 'info',
    message: 'query shopInfo',
    order: null,
    __typename: 'Log',
  },
  {
    _id: 'RoXnQX2sWSfiWD7Lg',
    created: 1642529343305,
    level: 'info',
    message: 'query me 196.188.245.230',
    order: null,
    __typename: 'Log',
  },
  {
    _id: 'snc8pwqm3RXBrgbRk',
    created: 1642529312073,
    level: 'info',
    message: 'query me 196.188.245.230',
    order: null,
    __typename: 'Log',
  },
  {
    _id: 'ZnGaD7qX5HDpWmipg',
    created: 1642529308969,
    level: 'info',
    message: 'query order K894fcKtYxNLxua7s',
    order: {
      _id: 'K894fcKtYxNLxua7s',
      orderNumber: 'Q1J62EMV',
      __typename: 'Order',
    },
    __typename: 'Log',
  },
  {
    _id: '4Rq29ZyPjgFCz759w',
    created: 1642529308967,
    level: 'info',
    message: 'query order K894fcKtYxNLxua7s',
    order: {
      _id: 'K894fcKtYxNLxua7s',
      orderNumber: 'Q1J62EMV',
      __typename: 'Order',
    },
    __typename: 'Log',
  },
  {
    _id: 'pusA5wW2HY9JdXQJY',
    created: 1642529308928,
    level: 'info',
    message: 'query order K894fcKtYxNLxua7s',
    order: {
      _id: 'K894fcKtYxNLxua7s',
      orderNumber: 'Q1J62EMV',
      __typename: 'Order',
    },
    __typename: 'Log',
  },
  {
    _id: 'GugAyuuc8GBEoubTK',
    created: 1642529308795,
    level: 'info',
    message: 'query order K894fcKtYxNLxua7s',
    order: {
      _id: 'K894fcKtYxNLxua7s',
      orderNumber: 'Q1J62EMV',
      __typename: 'Order',
    },
    __typename: 'Log',
  },
  {
    _id: 'CuDBQSHHBbitWrbPo',
    created: 1642529308767,
    level: 'info',
    message: 'query order K894fcKtYxNLxua7s',
    order: {
      _id: 'K894fcKtYxNLxua7s',
      orderNumber: 'Q1J62EMV',
      __typename: 'Order',
    },
    __typename: 'Log',
  },
  {
    _id: 'yQCAJWpyTJCkYQ4PG',
    created: 1642529308766,
    level: 'info',
    message: 'query order K894fcKtYxNLxua7s',
    order: {
      _id: 'K894fcKtYxNLxua7s',
      orderNumber: 'Q1J62EMV',
      __typename: 'Order',
    },
    __typename: 'Log',
  },
  {
    _id: 'Dym3eQHr2M3tNPDtu',
    created: 1642529308764,
    level: 'info',
    message: 'query order K894fcKtYxNLxua7s',
    order: {
      _id: 'K894fcKtYxNLxua7s',
      orderNumber: 'Q1J62EMV',
      __typename: 'Order',
    },
    __typename: 'Log',
  },
  {
    _id: 'XPpZNdoCruf7Zoofr',
    created: 1642529308683,
    level: 'info',
    message: 'query me 196.188.245.230',
    order: null,
    __typename: 'Log',
  },
  {
    _id: 'kknjCXnMpTLmQg4oE',
    created: 1642529302104,
    level: 'info',
    message: 'query me 196.188.245.230',
    order: null,
    __typename: 'Log',
  },
  {
    _id: 'EJsQzDFQCA5TMQKPo',
    created: 1642529300529,
    level: 'info',
    message: 'query me 196.188.245.230',
    order: null,
    __typename: 'Log',
  },
  {
    _id: 'rmrmgoyD8xCXSpGST',
    created: 1642529296032,
    level: 'info',
    message: 'query me 196.188.245.230',
    order: null,
    __typename: 'Log',
  },
  {
    _id: 'Cd2RddyEy5vqpKWXH',
    created: 1642529288623,
    level: 'info',
    message: 'query users 50 0 undefined',
    order: null,
    __typename: 'Log',
  },
  {
    _id: '2teox7PeFzjmwxpkA',
    created: 1642529288593,
    level: 'info',
    message: 'query me 196.188.245.230',
    order: null,
    __typename: 'Log',
  },
  {
    _id: 'ssntS6vQB3CJs684B',
    created: 1642528487863,
    level: 'info',
    message: 'query me 196.188.245.230',
    order: null,
    __typename: 'Log',
  },
  {
    _id: 'vqixkQJk3hT5cjMsk',
    created: 1642528476176,
    level: 'info',
    message: 'query shopInfo',
    order: null,
    __typename: 'Log',
  },
  {
    _id: 'NBzvGtBWyMCbxh4At',
    created: 1642528450571,
    level: 'info',
    message: 'query me 196.188.245.230',
    order: null,
    __typename: 'Log',
  },
  {
    _id: 'TavPpaDmcRcHrDkCK',
    created: 1642528438414,
    level: 'info',
    message: 'query order K894fcKtYxNLxua7s',
    order: {
      _id: 'K894fcKtYxNLxua7s',
      orderNumber: 'Q1J62EMV',
      __typename: 'Order',
    },
    __typename: 'Log',
  },
];

const UserLogs = ({ _id: userId }) => {
  /* const { logs } = useUserLogs({userId}); */

  const { formatMessage } = useIntl();

  return (
    <div className="m-5 flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 ">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-white">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {formatMessage({
                      id: 'date',
                      defaultMessage: 'Date',
                    })}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {formatMessage({
                      id: 'level',
                      defaultMessage: 'Level',
                    })}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {formatMessage({
                      id: 'message',
                      defaultMessage: 'Message',
                    })}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {formatMessage({
                      id: 'context',
                      defaultMessage: 'Context',
                    })}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {logs?.map((log) => (
                  <UserLogListItem key={log?._id} log={log} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ListPagination
        onLoadMore={() => {}}
        data={logs}
        total={logs?.length}
        onLimitChange={() => {}}
      />
    </div>
  );
};

export default UserLogs;
