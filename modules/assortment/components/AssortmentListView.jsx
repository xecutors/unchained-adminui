import Loading from '../../common/components/Loading';
import Pagination from '../../common/components/Pagination';
import { getSortKeys } from '../../common/utils/utils';
import useAssortments from '../hooks/useAssortments';
import AssortmentList from './AssortmentList';

const AssortmentListView = ({ options, queryString, selectedLocale }) => {
  const { includeInactive, includeLeaves, limit, offset, tags, slug, sort } =
    options;

  const sortKeys = getSortKeys(sort);

  const { assortments, assortmentsCount, loading } = useAssortments({
    queryString,
    includeInactive,
    includeLeaves,
    limit,
    offset,
    tags,
    slugs: slug,
    sort: sortKeys,
    forceLocale: selectedLocale,
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
