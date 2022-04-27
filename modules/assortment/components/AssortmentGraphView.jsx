import Loading from '../../common/components/Loading';
import AssortmentGraph from './AssortmentGraph';
import useAssortmentPaths from '../hooks/useAssortmentPaths';

const AssortmentGraphView = ({ options }) => {
  const [includeInactive, includeLeaves, slug] = options;

  const { assortments, loading } = useAssortmentPaths({
    slugs: [slug].filter(Boolean),
    includeInactive,
    includeLeaves,
  });

  return (
    <div className="min-w-full overflow-hidden">
      {loading ? <Loading /> : <AssortmentGraph assortments={assortments} />}
    </div>
  );
};

export default AssortmentGraphView;
