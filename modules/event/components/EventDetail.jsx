import { useIntl } from 'react-intl';
import Accordion from '../../common/components/Accordion';
import Badge from '../../common/components/Badge';
import NoData from '../../common/components/NoData';

import useFormatDateTime from '../../common/utils/useFormatDateTime';

const EventDetail = ({ event }) => {
  const { formatMessage } = useIntl();
  const { formatDateTime } = useFormatDateTime();

  const dataEvent = {
    header: (
      <div className="mr-4 text-base font-semibold text-slate-500 sm:text-lg sm:font-bold">
        {formatMessage({
          id: 'payload',
          defaultMessage: 'Payload',
        })}
      </div>
    ),
    body: (
      <div className="mt-2 text-sm text-slate-900">
        {event?.payload ? (
          <textarea
            disabled
            className="mt-1 block w-full max-w-full rounded-md border-2 resize-none border-slate-200 shadow-sm  sm:text-sm"
            id="payload"
            name="payload"
            value={JSON.stringify(event?.payload || {}, null, 2)}
            rows={Math.max(
              JSON.stringify(event?.payload || {}, null, 2).split(' ')?.length /
                5,
              5,
            )}
          />
        ) : (
          <NoData
            className="bg-white rounded-lg border border-slate-200 shadow-md"
            message={formatMessage({
              id: 'no_result',
              defaultMessage: 'Result',
            })}
          />
        )}
      </div>
    ),
  };

  const headerCSS =
    'inline-flex items-center justify-between w-full px-4 py-2 rounded-lg border border-slate-200 shadow-md text-sm font-medium text-slate-700 hover:bg-slate-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 ';

  return (
    <>
      <div className="mb-5 w-full border-t border-slate-300" />
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-md sm:p-6 lg:p-8">
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
              {formatDateTime(event?.created)}
            </span>
          </div>
        </div>
        <div>
          <Accordion data={[dataEvent]} headerCSS={headerCSS} />
        </div>
      </div>
    </>
  );
};

export default EventDetail;
