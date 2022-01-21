import useWorkQueue from '../../modules/work/hooks/useWorkQueue';
import WorkList from '../../modules/work/WorkList';

const index = () => {
  const { workQueue } = useWorkQueue();

  return <div>{workQueue && <WorkList works={workQueue} />}</div>;
};

export default index;
