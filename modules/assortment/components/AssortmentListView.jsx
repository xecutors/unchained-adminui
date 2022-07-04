import Loading from '../../common/components/Loading';
import Pagination from '../../common/components/Pagination';
import useAssortments from '../hooks/useAssortments';
import AssortmentList from './AssortmentList';

const AssortmentListView = ({ options, queryString }) => {
  const { includeInactive, includeLeaves, limit, offset, tags, slug, sort } =
    options;

  const sortKeys =
    (sort !== '' &&
      sort.split(',').map((field) => ({
        key: field.split('_')[0],
        value: field.split('_')[1],
      }))) ||
    [];

  const { assortments, assortmentsCount, loading } = useAssortments({
    queryString,
    includeInactive,
    includeLeaves,
    limit,
    offset,
    tags,
    slugs: slug,
    sort:
      sortKeys.length === 0 ? [{ key: 'sequence', value: 'ASC' }] : sortKeys,
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
