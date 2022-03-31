import Link from 'next/link';
import { format } from 'date-fns';
import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';
import Table from '../../common/components/Table';

const EventListItem = ({ event }) => {
  const { formatMessage } = useIntl();
  return (
    <Table.Row>
      <Table.Cell className="whitespace-nowrap px-6">
        <div className="flex items-center text-sm text-slate-900">
          <Link href={`/events/${event._id}`}>
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

      <Table.Cell className="whitespace-nowrap px-6">
        <div className="flex items-center text-sm text-slate-900">
          {event.type ? format(new Date(event.created), 'Pp') : 'n/a'}
        </div>
      </Table.Cell>
    </Table.Row>
  );
};

export default EventListItem;
