import { useIntl } from 'react-intl';
import NoData from '../../common/components/NoData';
import SyncReportListItem from './SyncReportListItem';

const SyncReportList = ({ data }) => {
  const { formatMessage } = useIntl();
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-b">
      {!data?.length && (
        <NoData
          message={formatMessage({
            id: 'sync_report',
            defaultMessage: 'Sync report',
          })}
        />
      )}
      <ul className="divide-y divide-gray-200">
        {(data || []).map((r) => (
          <SyncReportListItem key={r._id} data={r} />
        ))}
      </ul>
    </div>
  );
};

export default SyncReportList;
