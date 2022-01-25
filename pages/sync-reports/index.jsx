import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';
import SyncReportList from '../../modules/sync/components/SyncReportList';
import useDailySyncs from '../../modules/sync/hooks/useDailySyncs';

const SyncReport = () => {
  const { dailySync } = useDailySyncs({
    start: 1544475600000,
  });
  console.log(dailySync);
  return (
    <>
      <BreadCrumbs />
      <PageHeader headerText="Sync report" />

      <SyncReportList data={dailySync} />
    </>
  );
};

export default SyncReport;
