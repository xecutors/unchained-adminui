import { useIntl } from 'react-intl';
import Table from '../../common/components/Table';
import EnrollmentListItem from './EnrollmentListItem';

const EnrollmentList = ({ enrollments, showUser }) => {
  const { formatMessage } = useIntl();
  return (
    <Table className="min-w-full">
      {enrollments?.map((enrollment) => (
        <Table.Row key={enrollment._id} className="bg-white " header>
          <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
            {formatMessage({
              id: 'enrollment_number',
              defaultMessage: 'Enrollment number',
            })}
          </Table.Cell>

          <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
            {formatMessage({
              id: 'created',
              defaultMessage: 'Created',
            })}
          </Table.Cell>

          <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
            {formatMessage({
              id: 'expires',
              defaultMessage: 'Expires',
            })}
          </Table.Cell>
          {showUser && (
            <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
              {formatMessage({
                id: 'user',
                defaultMessage: 'User',
              })}
            </Table.Cell>
          )}

          <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
            {formatMessage({
              id: 'product',
              defaultMessage: 'Product',
            })}
          </Table.Cell>

          <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
            {formatMessage({
              id: 'status',
              defaultMessage: 'Status',
            })}
          </Table.Cell>
          <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
            {formatMessage({
              id: 'payment_provider',
              defaultMessage: 'Payment',
            })}
          </Table.Cell>
          <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
            {formatMessage({
              id: 'delivery_provider',
              defaultMessage: 'Delivery',
            })}
          </Table.Cell>
        </Table.Row>
      ))}
      {enrollments?.map((enrollment) => (
        <EnrollmentListItem
          showUser
          key={`${enrollment?._id}-body`}
          enrollment={enrollment}
        />
      ))}
    </Table>
  );
};

export default EnrollmentList;
