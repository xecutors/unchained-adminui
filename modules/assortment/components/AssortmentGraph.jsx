import buildAssortmentTree from '../utils/buildAssortmentTree';
import TangleTree from './TangleTree';

const AssortmentGraph = ({ assortments }) => {
  return (
    <div className="relative w-full h-max rounded-lg bg-white shadow dark:shadow-white dark:bg-slate-600 text-slate-900 dark:text-white">
      <TangleTree data={buildAssortmentTree(assortments)} />
    </div>
  );
};

export default AssortmentGraph;
