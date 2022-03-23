import { useIntl } from 'react-intl';
import Table from '../../common/components/Table';
import WorkListItem from './WorkListItem';

const WorkList = ({ workQueue }) => {
  const { formatMessage } = useIntl();

  return (
    <Table className="min-w-full ">
      {workQueue?.map((work) => (
        <Table.Row key={`${work._id}-header`} className="bg-white " header>
          <Table.Cell className="text-left text-xs font-medium  uppercase tracking-wider text-gray-500">
            {formatMessage({
              id: 'work_number',
              defaultMessage: 'Work #',
            })}
          </Table.Cell>

          <Table.Cell className="text-left text-xs font-medium  uppercase tracking-wider text-gray-500">
            {formatMessage({ id: 'status', defaultMessage: 'Status' })}
          </Table.Cell>

          <Table.Cell className="text-left text-xs font-medium  uppercase tracking-wider text-gray-500">
            {formatMessage({
              id: 'created',
              defaultMessage: 'Created',
            })}
          </Table.Cell>

          <Table.Cell className="text-left text-xs font-medium  uppercase tracking-wider text-gray-500">
            {formatMessage({
              id: 'scheduled',
              defaultMessage: 'Scheduled',
            })}
          </Table.Cell>

          <Table.Cell className="text-left text-xs font-medium  uppercase tracking-wider text-gray-500">
            {formatMessage({
              id: 'started',
              defaultMessage: 'Started',
            })}
          </Table.Cell>

          <Table.Cell className="text-left text-xs font-medium  uppercase tracking-wider text-gray-500">
            {formatMessage({
              id: 'finished',
              defaultMessage: 'Finished',
            })}
          </Table.Cell>
        </Table.Row>
      ))}

      {workQueue?.map((work) => (
        <WorkListItem key={`${work?._id}-body`} work={work} />
      ))}
    </Table>
  );
};

export default WorkList;
