import { useIntl } from 'react-intl';
import Accordion from '../../common/components/Accordion';
import AccordionHeader from '../../common/components/AccordionHeader';
import Badge from '../../common/components/Badge';
import JSONView from '../../common/components/JSONView';
import NoData from '../../common/components/NoData';

import useFormatDateTime from '../../common/utils/useFormatDateTime';

const EventDetail = ({ event }) => {
  const { formatMessage } = useIntl();
  const { formatDateTime } = useFormatDateTime();

  const dataEvent = {
    header: (
      <AccordionHeader
        name={formatMessage({ id: 'payload', defaultMessage: 'Payload' })}
      />
    ),
    body: event?.payload ? (
      <JSONView
        disable
        value={event.payload}
        className="mt-1 block w-full max-w-full rounded-md border-2 resize-none border-slate-200 shadow-sm sm:text-sm"
      />
    ) : (
      <NoData
        className="bg-white rounded-lg capitalize border border-slate-200 shadow-md"
        message={formatMessage({
          id: `no_payload`,
          defaultMessage: 'Payload',
        })}
      />
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
