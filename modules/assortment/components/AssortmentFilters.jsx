import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { DragDropContext } from 'react-beautiful-dnd';

import classNames from 'classnames';
import { useState } from 'react';
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

  const [isDraggingOver, setIsDraggingOver] = useState(false);

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
      toast.success(
        formatMessage({
          id: 'filter_reorder_empty',
          defaultMessage: 'Filter destination is empty',
        }),
      );
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      toast.success(
        formatMessage({
          id: 'filter_already_ordered',
          defaultMessage: 'Filter already on that order',
        }),
      );
      return;
    }

    const sortKeys = assortmentFilters.map((media) => ({
      assortmentFilterId: media._id,
      sortKey: media.sortKey,
    }));

    const [removedSortKey] = sortKeys.splice(source.index, 1);
    sortKeys.splice(destination.index, 0, removedSortKey);

    sortKeys.map((sk, index) => {
      // eslint-disable-next-line no-param-reassign
      sk.sortKey = index;
      return sk;
    });

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
    <>
      <SelfDocumentingView
        documentationLabel={formatMessage({
          id: 'add_assortment_filter',
          defaultMessage: 'Add Filters',
        })}
        documentation="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco"
        mainContent={<AssortmentFiltersForm assortmentId={assortmentId} />}
      />

      <SelfDocumentingView
        documentationLabel={formatMessage({
          id: 'assigned_assortment_filters',
          defaultMessage: 'Assigned filters',
        })}
        className="mt-5"
        documentation="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
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
        <div
          className={classNames(
            'ml-auto w-full bg-white py-2 px-6 shadow md:col-span-2',
            {
              'bg-slate-100': isDraggingOver,
            },
          )}
        >
          <DragDropContext onDragEnd={handleDragEnd}>
            <AssortmentFiltersList
              filters={assortmentFilters}
              onRemoveFilter={onRemoveFilter}
              setIsDraggingOver={setIsDraggingOver}
            />
          </DragDropContext>
        </div>
      )}
    </div>
  );
};

export default AssortmentFilters;
