import Loading from '../../common/components/Loading';
import AssortmentGraph from './AssortmentGraph';
import useAssortmentChildren from '../hooks/useAssortmentChildren';

const AssortmentGraphView = ({ options, selectedLocale = null }) => {
  const { includeInactive, slug } = options;

  const { assortments, loading } = useAssortmentChildren({
    slugs: slug ? [slug].filter(Boolean) : null,
    includeInactive,
    includeLeaves: !!slug,
    forceLocale: selectedLocale,
  });

  return (
    <div className="min-w-full overflow-hidden">
      {loading ? <Loading /> : <AssortmentGraph assortments={assortments} />}
    </div>
  );
};

export default AssortmentGraphView;
