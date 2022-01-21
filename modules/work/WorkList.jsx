import { useIntl } from 'react-intl';
import ListHeader from '../common/components/ListHeader';
import Table from '../common/components/Table';
import WorkListItem from './WorkListItem';

const WorkList = ({ works = [] }) => {
    console.log('ssssss', works)
  const { formatMessage } = useIntl();
return (
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="shadow overflow-hidden border-b border-gray-200 ">
           <ListHeader addPath="/work/new"/>

          <Table>
            
{works?.map((w) =>( <Table.Row header key={`${w._id}`} >
                <Table.Cell>
                <div>
                  {formatMessage({
                    id: 'type',
                    defaultMessage: 'Work #',
                  })}
                  </div>
                </Table.Cell>

                <Table.Cell>
                  {formatMessage({ id: 'status', defaultMessage: 'Status' })}
                </Table.Cell>

                <Table.Cell>
                  {formatMessage({
                    id: 'created',
                    defaultMessage: 'Created',
                  })}
                </Table.Cell>

                <Table.Cell>
                  {formatMessage({
                    id: 'scheduled',
                    defaultMessage: 'Scheduled',
                  })}
                </Table.Cell>

                <Table.Cell>
                  {formatMessage({
                    id: 'started',
                    defaultMessage: 'Started',
                  })}
                </Table.Cell>

                <Table.Cell>
                  {formatMessage({
                    id: 'finished',
                    defaultMessage: 'Finished',
                  })}
                </Table.Cell>

                <Table.Cell>&nbsp;</Table.Cell>

                <Table.Cell>&nbsp;</Table.Cell>
              </Table.Row> ))}
            
{works?.map((w) => (
<WorkListItem work={w} key={`${w._id}1`} /> ))}
          
          </Table>
        </div>
      </div>
    </div>
  );
};

export default WorkList;
