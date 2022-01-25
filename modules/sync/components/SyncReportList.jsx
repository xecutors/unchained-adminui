import SyncReportListItem from './SyncReportListItem';

const SyncReportList = ({ data }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {data.map((r) => (
          <SyncReportListItem data={r} />
        ))}
      </ul>
    </div>
  );
};

export default SyncReportList;
