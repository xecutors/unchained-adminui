import { useState } from 'react';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import ListHeader from '../../modules/common/components/ListHeader';
import Pagination from '../../modules/common/components/Pagination';
import PageHeader from '../../modules/common/components/PageHeader';
import Toggle from '../../modules/common/components/Toggle';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import useFilters from '../../modules/filter/hooks/useFilters';
import FilterList from '../../modules/filter/components/FilterList';
import Loading from '../../modules/common/components/Loading';
import DangerMessage from '../../modules/modal/components/DangerMessage';
import useModal from '../../modules/modal/hooks/useModal';
import useRemoveFilter from '../../modules/filter/hooks/useRemoveFilter';

const index = () => {
  const [limit, setLimit] = useState(DefaultLimit);
  const [includeInactive, setIncludeInactive] = useState(false);
  const [offset, setOffset] = useState(0);
  const { setModal } = useModal();
  const { removeFilter } = useRemoveFilter();

  const { filters, filtersCount, loadMore, loading } = useFilters({
    limit,
    includeInactive,
    offset,
  });
  const { formatMessage } = useIntl();

  const onRemoveFilter = async (filterId) => {
    await setModal(
      <DangerMessage
        message={formatMessage({
          id: 'delete_filter_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this language? ',
        })}
        onOkClick={async () => {
          setModal('');
          await removeFilter({ filterId });
          toast.success(
            formatMessage(
              {
                id: 'filter_deleted',
                defaultMessage: 'filter {id} deleted successfully',
              },
              {
                id: filterId,
              },
            ),
          );
        }}
        okText={formatMessage({
          id: 'delete_filter',
          defaultMessage: 'Delete filter',
        })}
      />,
    );
  };

  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'filters_list_header',
          defaultMessage: 'Filters',
        })}
      />
      <div className="min-w-full  sm:shadow-lg   shadow overflow-hidden border-b border-gray-200  ">
        <ListHeader addPath="/filters/new">
          <Toggle
            toggleText={formatMessage({
              id: 'include_inactive',
              defaultMessage: 'Include inactive',
            })}
            toggleState={includeInactive}
            onToggle={setIncludeInactive}
          />
        </ListHeader>

        {loading ? (
          <Loading />
        ) : (
          <FilterList filters={filters} onRemoveFilter={onRemoveFilter} />
        )}
        <Pagination
          onLoadMore={loadMore}
          data={filters}
          total={filtersCount}
          limit={limit}
          onLimitChange={setLimit}
          offset={offset}
          onOffsetChange={setOffset}
        />
      </div>
    </>
  );
};

export default index;
