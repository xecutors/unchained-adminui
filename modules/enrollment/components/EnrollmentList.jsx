import { useIntl } from 'react-intl';
import Table from '../../common/components/Table';
import EnrollmentListItem from './EnrollmentListItem';

const EnrollmentList = ({ enrollments, showUser }) => {
  const { formatMessage } = useIntl();
  return (
    <Table className="min-w-full">
      {enrollments?.map((enrollment) => (
        <Table.Row key={enrollment._id} header>
          <Table.Cell className="uppercase">
            {formatMessage({
              id: 'enrollment_number',
              defaultMessage: 'Enrollment number',
            })}
          </Table.Cell>

          <Table.Cell className="uppercase sm:text-center">
            {formatMessage({
              id: 'created',
              defaultMessage: 'Created',
            })}
          </Table.Cell>

          <Table.Cell className="uppercase">
            {formatMessage({
              id: 'expires',
              defaultMessage: 'Expires',
            })}
          </Table.Cell>
          {showUser && (
            <Table.Cell className="uppercase">
              {formatMessage({
                id: 'user',
                defaultMessage: 'User',
              })}
            </Table.Cell>
          )}

          <Table.Cell className="uppercase">
            {formatMessage({
              id: 'product',
              defaultMessage: 'Product',
            })}
          </Table.Cell>

          <Table.Cell className="uppercase">
            {formatMessage({
              id: 'status',
              defaultMessage: 'Status',
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
