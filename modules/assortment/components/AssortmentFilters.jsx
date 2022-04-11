import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { DragDropContext } from 'react-beautiful-dnd';

import DangerMessage from '../../modal/components/DangerMessage';
import useModal from '../../modal/hooks/useModal';
import useAssortmentFilters from '../hooks/useAssortmentFilters';
import useRemoveAssortmentFilter from '../hooks/useRemoveAssortmentFilter';
import AssortmentFiltersList from './AssortmentFiltersList';
import AssortmentFiltersForm from './AssortmentFiltersForm';
import Loading from '../../common/components/Loading';
import useReorderAssortmentFilters from '../hooks/useReorderAssortmentFilters';

const AssortmentFilters = ({ assortmentId }) => {
  const { formatMessage } = useIntl();
  const { assortmentFilters, loading } = useAssortmentFilters({ assortmentId });
  const { setModal } = useModal();

  const { removeAssortmentFilter } = useRemoveAssortmentFilter();
  const { reorderAssortmentFilters } = useReorderAssortmentFilters();

  const onRemoveFilter = async (assortmentFilterId) => {
    await setModal(
      <DangerMessage
        message={formatMessage({
          id: 'delete_assortment_filter_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this language? ',
        })}
        onOkClick={async () => {
          setModal('');
          await removeAssortmentFilter({ assortmentFilterId });
          toast.success(
            formatMessage({
              id: 'assortment_filter_deleted',
              defaultMessage: 'Assortment filter deleted successfully',
            }),
          );
        }}
        okText={formatMessage({
          id: 'delete_filter',
          defaultMessage: 'Delete filter',
        })}
      />,
    );
  };

  const handleDragEnd = async (result) => {
    const { destination, source } = result;

    if (!destination) {
      toast.info(
        formatMessage({
          id: 'drop_area_empty',
          defaultMessage: 'Destination is empty',
        }),
      );
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newSortKeys = assortmentFilters.map((media) => ({
      assortmentFilterId: media._id,
      sortKey: media.sortKey,
    }));

    const [removedSortKey] = newSortKeys.splice(source.index, 1);
    newSortKeys.splice(destination.index, 0, removedSortKey);

    const sortKeys = newSortKeys.map((sortKey, index) => ({
      ...sortKey,
      sortKey: index,
    }));

    try {
      await reorderAssortmentFilters({ sortKeys });
      toast.success(
        formatMessage({
          id: 'filter_reorder',
          defaultMessage: 'Filter reorder successfully',
        }),
      );
    } catch (error) {
      toast.error(
        formatMessage({
          id: 'fail_reorder',
          defaultMessage: 'Filter reorder failed, Try again!',
        }),
      );
    }
  };

  return (
    <div className="mt-5 md:grid md:grid-cols-3 md:gap-6">
      <div className="md:col-span-1">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium leading-6 text-slate-900">
            {formatMessage({
              id: 'add_assortment_filter',
              defaultMessage: 'Add Filters',
            })}
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco
          </p>
        </div>
      </div>
      <div className="md:col-span-2">
        <AssortmentFiltersForm assortmentId={assortmentId} />
      </div>
      <div className="md:col-span-1">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium leading-6 text-slate-900">
            {formatMessage({
              id: 'assigned_assortment_filters',
              defaultMessage: 'Assigned filters',
            })}
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco
          </p>
        </div>
      </div>
      {loading ? (
        <div className="ml-auto w-full md:col-span-2">
          <Loading />
        </div>
      ) : (
        <div className="ml-auto w-full bg-white md:col-span-2">
          <DragDropContext onDragEnd={handleDragEnd}>
            <AssortmentFiltersList
              filters={assortmentFilters}
              onRemoveFilter={onRemoveFilter}
            />
          </DragDropContext>
        </div>
      )}
    </div>
  );
};

export default AssortmentFilters;
