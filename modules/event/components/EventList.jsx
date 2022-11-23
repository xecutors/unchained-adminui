import { useIntl } from 'react-intl';
import Table from '../../common/components/Table';
import EventListItem from './EventListItem';

const EventList = ({ events }) => {
  const { formatMessage } = useIntl();
  return (
    <Table className="min-w-full ">
      {events?.map((event) => (
        <Table.Row key={event._id} header>
          <Table.Cell>
            {formatMessage({ id: 'type', defaultMessage: 'Type' })}
          </Table.Cell>
          <Table.Cell>
            {formatMessage({
              id: 'created',
              defaultMessage: 'Created',
            })}
          </Table.Cell>
        </Table.Row>
      ))}

      {events?.map((event) => (
        <EventListItem key={`${event?._id}-body`} event={event} />
      ))}
    </Table>
  );
};

export default EventList;
