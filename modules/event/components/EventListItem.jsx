import Link from 'next/link';
import { format } from 'date-fns';
import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';
import Table from '../../common/components/Table';

const EventListItem = ({ event }) => {
  const { formatMessage } = useIntl();
  return (
    <Table.Row>
      <Table.Cell className="px-6  whitespace-nowrap ">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          <Link href={`/event/${event._id}`}>
            <a className="text-blue-600">
              {event?.type || (
                <>
                  {event._id}{' '}
                  <Badge
                    color="blue"
                    text={formatMessage({
                      id: 'created',
                      defaultMessage: 'Created',
                    })}
                  />
                </>
              )}
            </a>
          </Link>
        </div>
      </Table.Cell>

      <Table.Cell className="px-6  whitespace-nowrap ">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          {event.type ? format(new Date(event.created), 'Pp') : 'n/a'}
        </div>
      </Table.Cell>
    </Table.Row>
  );
};

export default EventListItem;
