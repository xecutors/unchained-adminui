import useWorkQueue from '../../modules/work/hooks/useWorkQueue';
import WorkList from '../../modules/work/WorkList';

const index = () => {
  const { workQueue } = useWorkQueue();
  console.log(workQueue);
  return <div>{workQueue && <WorkList works={workQueue} />}</div>;
};

export default index;
