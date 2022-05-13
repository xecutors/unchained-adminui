import Loading from '../../common/components/Loading';
import Pagination from '../../common/components/Pagination';
import useAssortments from '../hooks/useAssortments';
import AssortmentList from './AssortmentList';

const AssortmentListView = ({ options, queryString }) => {
  const { includeInactive, includeLeaves, limit, offset, tags, slug } = options;

  const { assortments, assortmentsCount, loading } = useAssortments({
    queryString,
    includeInactive,
    includeLeaves,
    limit,
    offset,
    tags,
    slugs: slug,
  });

  return loading ? (
    <Loading />
  ) : (
    <>
      <AssortmentList assortments={assortments} />
      <Pagination data={assortments} total={assortmentsCount} />
    </>
  );
};

export default AssortmentListView;
