import loadable from '@loadable/component';
import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';

import { formatDateTime } from '../../common/utils/utils';

const ReactJson = loadable(() => import('react-json-view'));
const EventDetail = ({ event }) => {
  const { formatMessage } = useIntl();

  console.log(event);
  return (
    <>
      <div className="w-full border-t border-gray-300 mb-5" />
      <div className="bg-white rounded-lg border border-gray-200 shadow-md p-4 sm:p-6 lg:p-8">
        <div className="pb-1 text-sm font-normal my-1">
          {formatMessage({
            id: 'event_type',
            defaultMessage: 'Event Type:',
          })}

          <span className="ml-2">
            {event.type ? (
              <Badge text={event.type} square className="p-2" />
            ) : (
              formatMessage({ id: 'no_type', defaultMessage: 'N/A' })
            )}
          </span>
        </div>
        <div className="pb-1 text-sm font-normal my-1">
          {formatMessage({
            id: 'event_created',
            defaultMessage: 'Event Created:',
          })}
          <span className="ml-2">
            {event.created
              ? formatDateTime(event.created, {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })
              : formatMessage({ id: 'no_date', defaultMessage: 'N/A' })}
          </span>
        </div>
        <div>
          <ReactJson src={event.payload} />
        </div>
      </div>
    </>
  );
};

export default EventDetail;
