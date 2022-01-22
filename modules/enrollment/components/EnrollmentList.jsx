import { useIntl } from 'react-intl';
import ListPagination from '../../common/components/ListPagination';

import EnrollmentListItem from './EnrollmentListItem';

const EnrollmentList = ({
  enrollments,
  showUser,
  onLoadMore,
  onLimitChange,
  total,
}) => {
  const { formatMessage } = useIntl();
  return (
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="shadow overflow-hidden border-b border-gray-200 ">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white ">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {formatMessage({
                    id: 'enrollment_number',
                    defaultMessage: 'Enrollment number',
                  })}
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {formatMessage({
                    id: 'created',
                    defaultMessage: 'Created',
                  })}
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {formatMessage({
                    id: 'expires',
                    defaultMessage: 'Expires',
                  })}
                </th>

                {showUser && (
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {formatMessage({
                      id: 'user',
                      defaultMessage: 'User',
                    })}
                  </th>
                )}

                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {formatMessage({
                    id: 'product',
                    defaultMessage: 'Product',
                  })}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {formatMessage({
                    id: 'status',
                    defaultMessage: 'Status',
                  })}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {enrollments?.map((enrollment) => (
                <EnrollmentListItem
                  showUser
                  key={enrollment?._id}
                  enrollment={enrollment}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ListPagination
        onLoadMore={onLoadMore}
        data={enrollments}
        total={total}
        onLimitChange={onLimitChange}
      />
    </div>
  );
};

export default EnrollmentList;
