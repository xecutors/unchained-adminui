import Loading from '../../common/components/Loading';
import Pagination from '../../common/components/Pagination';
import { convertSortFieldsToQueryFormat } from '../../common/utils/utils';
import useAssortments from '../hooks/useAssortments';
import AssortmentList from './AssortmentList';

const AssortmentListView = ({
  options,
  queryString,
  selectedLocale = null,
  sortable,
}) => {
  const { includeInactive, includeLeaves, limit, offset, tags, slug, sort } =
    options;

  const sortKeys = convertSortFieldsToQueryFormat(sort);

  const { assortments, assortmentsCount, loading, loadMore } = useAssortments({
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
      <AssortmentList assortments={assortments} sortable={sortable} />
      <Pagination
        data={assortments}
        total={assortmentsCount}
        onLoadMore={loadMore}
      />
    </>
  );
};

export default AssortmentListView;
