import Layout from '../../modules/common/components/Layout';
import useLogs from '../../modules/logs/hooks/useLogs';
import LogsListItem from '../../modules/logs/logs/component/LogsListItem';

const index = () => {
  const { logs } = useLogs({ limit: 20 });
  return (
    <Layout>
      <LogsListItem logs={logs} />
    </Layout>
  );
};

export default index;
