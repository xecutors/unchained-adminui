import { useIntl } from 'react-intl';
import Table from '../../common/components/Table';
import WorkListItem from './WorkListItem';

const WorkList = ({ workQueue }) => {
  const { formatMessage } = useIntl();

  return (
    <Table className="min-w-full ">
      {workQueue?.map((work) => (
        <Table.Row key={work._id} className="bg-white " header>
          <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
            {formatMessage({
              id: 'work_number',
              defaultMessage: 'Work #',
            })}
          </Table.Cell>

          <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
            {formatMessage({ id: 'status', defaultMessage: 'Status' })}
          </Table.Cell>

          <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
            {formatMessage({
              id: 'created',
              defaultMessage: 'Created',
            })}
          </Table.Cell>

          <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
            {formatMessage({
              id: 'scheduled',
              defaultMessage: 'Scheduled',
            })}
          </Table.Cell>

          <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
            {formatMessage({
              id: 'started',
              defaultMessage: 'Started',
            })}
          </Table.Cell>

          <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
            {formatMessage({
              id: 'finished',
              defaultMessage: 'Finished',
            })}
          </Table.Cell>
        </Table.Row>
      ))}

      {workQueue?.map((work) => (
        <WorkListItem key={`${work?._id}111`} work={work} />
      ))}
    </Table>
  );
};

export default WorkList;
