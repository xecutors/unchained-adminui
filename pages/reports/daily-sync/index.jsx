import { useIntl } from 'react-intl';
import BreadCrumbs from '../../../modules/common/components/BreadCrumbs';
import PageHeader from '../../../modules/common/components/PageHeader';
import SyncReportList from '../../../modules/sync/components/SyncReportList';
import useDailySyncs from '../../../modules/sync/hooks/useDailySyncs';

const SyncReport = () => {
  const { dailySync } = useDailySyncs({
    start: 1544475600000,
  });
  const { formatMessage } = useIntl();

  return (
    <div className="p-5">
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'daily_sync',
          defaultMessage: 'Daily sync',
        })}
      />
      <SyncReportList data={dailySync} />
    </div>
  );
};

export default SyncReport;
