import Loading from '../../common/components/Loading';
import useDailySyncs from '../hooks/useDailySyncs';
import SyncReportList from './SyncReportList';

const SyncSummary = () => {
  const { dailySync, loading } = useDailySyncs();

  return loading ? <Loading /> : <SyncReportList data={dailySync} />;
};

export default SyncSummary;
