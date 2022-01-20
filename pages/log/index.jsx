import useLogs from '../../modules/logs/hooks/useLogs';
import LogsList from '../../modules/logs/logs/component/LogsList';

const index = () => {
  const { logs } = useLogs({ limit: 20 });
  return <LogsList logs={logs} />;
};

export default index;
