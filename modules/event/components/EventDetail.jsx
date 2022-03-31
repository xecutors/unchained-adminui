import loadable from '@loadable/component';
import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';

import { formatDateTime } from '../../common/utils/utils';

const ReactJson = loadable(() => import('react-json-view'));
const EventDetail = ({ event }) => {
  const { formatMessage } = useIntl();
  return (
    <>
      <div className="mb-5 w-full border-t border-slate-300" />
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-md sm:p-6 lg:p-8">
        <div className="flex justify-between ">
          <div className="my-1 pb-1 text-sm  font-bold">
            {formatMessage({
              id: 'type_colon',
              defaultMessage: 'Type:',
            })}
            <span className="ml-2">
              <Badge text={event.type} square className="p-2" color="indigo" />
            </span>
          </div>
          <div className="my-1 pb-1 font-mono text-lg">
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
