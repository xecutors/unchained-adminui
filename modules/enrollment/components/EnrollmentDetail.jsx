import { useIntl } from 'react-intl';
import LogList from '../../order/components/LogList';
import useEnrollmentStatusTypes from '../hooks/useEnrollmentStatusTypes';
import Header from '../../common/components/Header';
import StatusProgress from '../../common/components/StatusProgress';
import Accordion from '../../common/components/Accordion';

const EnrollmentDetail = ({ enrollment }) => {
  const { formatMessage } = useIntl();

  const { enrollmentStatusTypes } = useEnrollmentStatusTypes();

  console.log(enrollmentStatusTypes);

  const timeline = {
    INITIAL: {
      id: 1,
      content: 'created',
      visible: true,
    },
    ACTIVE: {
      id: 2,
      content: 'updated',
      visible: true,
    },
    PAUSED: {
      id: 3,
      content: 'updated',
      visible: true,
    },
    TERMINATED: {
      id: 4,
      content: 'updated',
      visible: true,
    },
  };

  const headerCSS =
    'inline-flex items-center justify-between w-full px-4 py-2 rounded-t-md border border-gray-300 bg-grey-100 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500';

  const logs = {
    header: (
      <span className="flex">
        {formatMessage({
          id: 'logs',
          defaultMessage: 'Logs',
        })}
      </span>
    ),
    body: <LogList logs={enrollment.logs} />,
  };

  return (
    <>
      <Header name="quotation" data={enrollment} />
      <StatusProgress
        data={enrollment}
        statusTypes={enrollmentStatusTypes}
        timeline={timeline}
      />

      <Accordion data={[logs]} headerCSS={headerCSS} />
    </>
  );
};

export default EnrollmentDetail;
