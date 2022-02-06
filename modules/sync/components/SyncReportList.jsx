import SyncReportListItem from './SyncReportListItem';

const SyncReportList = ({ data }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-b">
      <ul className="divide-y divide-gray-200">
        {(data || []).map((r) => (
          <SyncReportListItem key={r._id} data={r} />
        ))}
      </ul>
    </div>
  );
};

export default SyncReportList;
