import Link from 'next/link';

import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';
import Table from '../../common/components/Table';
import useFormatDateTime from '../../common/utils/useFormatDateTime';

const EventListItem = ({ event }) => {
  const { formatMessage } = useIntl();
  const { formatDateTime } = useFormatDateTime();
  return (
    <Table.Row>
      <Table.Cell className="whitespace-nowrap px-6">
        <div className="flex items-center text-sm">
          <Link href={`/events/${event._id}`}>
            <a className="text-blue-600 dark:text-blue-400">
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
        <div className="flex items-center text-sm">
          {formatDateTime(event.created)}
        </div>
      </Table.Cell>
    </Table.Row>
  );
};

export default EventListItem;
