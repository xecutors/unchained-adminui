import loadable from '@loadable/component';
import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';

import { formatDateTime } from '../../common/utils/utils';

const ReactJson = loadable(() => import('react-json-view'));
const EventDetail = ({ event }) => {
  const { formatMessage } = useIntl();
  return (
    <>
      <div className="w-full border-t border-gray-300 mb-5" />
      <div className="bg-white rounded-lg border border-gray-200 shadow-md p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between ">
          <div className="pb-1 text-sm font-bold  my-1">
            {formatMessage({
              id: 'type_colon',
              defaultMessage: 'Type:',
            })}
            <span className="ml-2">
              <Badge text={event.type} square className="p-2" color="indigo" />
            </span>
          </div>
          <div className="pb-1 text-lg font-mono my-1">
            <span className="ml-2 font-bold">
              {formatDateTime(event.created, {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>
        <div>
          <ReactJson src={event.payload} />
        </div>
      </div>
    </>
  );
};

export default EventDetail;
