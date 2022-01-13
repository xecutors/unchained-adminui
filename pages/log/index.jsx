import Layout from '../../modules/common/components/Layout';
import useLogs from '../../modules/logs/hooks/useLogs';
import LogsList from '../../modules/logs/logs/component/LogsList';

const index = () => {
  const { logs } = useLogs({ limit: 20 });
  return (
    <Layout>
      <LogsList logs={logs} />
    </Layout>
  );
};

export default index;
