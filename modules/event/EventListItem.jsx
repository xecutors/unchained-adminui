import Link from 'next/link';
import { format } from 'date-fns';
import { useIntl } from 'react-intl';
import Badge from '../common/components/Badge';

const EventListItem = (event) => {
  const { formatMessage } = useIntl();
  return (
    <tr key={event._id}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          <Link href={`/event/${event._id}`}>
            <a className="text-blue-600">
              {event?.created || (
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
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          {event.type ? format(new Date(event.type), 'Pp') : 'n/a'}
        </div>
      </td>
    </tr>
  );
};

export default EventListItem;
