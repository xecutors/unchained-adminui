import { FormattedMessage, useIntl } from 'react-intl';
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
import SelfDocumentingView from '../../common/components/SelfDocumentingView';

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
          defaultMessage: 'Reordering failed, Try again!',
        }),
      );
    }
  };

  return (
    <>
      <SelfDocumentingView
        documentationLabel={formatMessage({
          id: 'assortment_filters_form_header',
          defaultMessage: 'Filters',
        })}
        className="mt-2 sm:mt-0"
        documentation={
          <FormattedMessage
            id="assortment_filter_form_description"
            defaultMessage="<ul> <li>Assign filters that will be applied for the assortment </li>
      </ul>"
            values={{
              ul: (chunk) => <ul className="list-disc">{chunk} </ul>,
              li: (chunk) => <li>{chunk} </li>,
            }}
          />
        }
      >
        <AssortmentFiltersForm assortmentId={assortmentId} />
      </SelfDocumentingView>
      <SelfDocumentingView
        documentationLabel={formatMessage({
          id: 'assortment_filters_header',
          defaultMessage: 'Assortment filters',
        })}
        className="sm:mt-4"
        documentation={
          <FormattedMessage
            id="assortment_filter_list_description"
            defaultMessage="<ul> <li>All filters that are applied when searching for this assortment </li>
            <li> Drag and drop list items to sort filters order </li>
          </ul>"
            values={{
              ul: (chunk) => <ul className="list-disc">{chunk} </ul>,
              li: (chunk) => <li>{chunk} </li>,
            }}
          />
        }
      >
        {loading ? (
          <div className="ml-auto shadow dark:shadow-none w-full md:col-span-2">
            <Loading />
          </div>
        ) : (
          <div className="ml-auto shadow dark:shadow-none w-full md:col-span-2 bg-white">
            <DragDropContext onDragEnd={handleDragEnd}>
              <AssortmentFiltersList
                filters={assortmentFilters}
                onRemoveFilter={onRemoveFilter}
              />
            </DragDropContext>
          </div>
        )}
      </SelfDocumentingView>
    </>
  );
};

export default AssortmentFilters;
