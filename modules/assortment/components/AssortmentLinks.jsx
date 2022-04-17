import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { DragDropContext } from 'react-beautiful-dnd';

import Loading from '../../common/components/Loading';
import DangerMessage from '../../modal/components/DangerMessage';
import useModal from '../../modal/hooks/useModal';
import useAssortmentLinks from '../hooks/useAssortmentLinks';
import useRemoveAssortmentLink from '../hooks/useRemoveAssortmentLink';
import AssortmentLinkForm from './AssortmentLinkForm';
import AssortmentLinksList from './AssortmentLinksList';
import useReorderAssortmentLink from '../hooks/useReorderAssortmentLinks';

const AssortmentLinks = ({ assortmentId }) => {
  const { formatMessage } = useIntl();
  const { setModal } = useModal();
  const { linkedAssortments, loading } = useAssortmentLinks({ assortmentId });

  const { removeAssortmentLink } = useRemoveAssortmentLink();
  const { reorderAssortmentLink } = useReorderAssortmentLink();

  const onRemoveLink = async (assortmentLinkId) => {
    await setModal(
      <DangerMessage
        message={formatMessage({
          id: 'delete_assortment_link',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this language? ',
        })}
        onOkClick={async () => {
          setModal('');
          await removeAssortmentLink({ assortmentLinkId });
          toast.success(
            formatMessage(
              {
                id: 'assortment_link',
                defaultMessage: 'Link {id} deleted successfully',
              },
              {
                id: assortmentLinkId,
              },
            ),
          );
        }}
        okText={formatMessage({
          id: 'delete_link',
          defaultMessage: 'Delete link',
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

    const newSortKeys = linkedAssortments.map((media) => ({
      assortmentLinkId: media._id,
      sortKey: media.sortKey,
    }));

    const [removedSortKey] = newSortKeys.splice(source.index, 1);
    newSortKeys.splice(destination.index, 0, removedSortKey);

    const sortKeys = newSortKeys.map((sortKey, index) => ({
      ...sortKey,
      sortKey: index,
    }));

    try {
      await reorderAssortmentLink({ sortKeys });
      toast.success(
        formatMessage({
          id: 'link_reorder',
          defaultMessage: 'Link reorder successfully',
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
    <div className="mt-0 md:mt-5">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="mb-4 md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-slate-900 dark:text-white">
              {formatMessage({
                id: 'assortment_links',
                defaultMessage: 'Links',
              })}
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco
            </p>
          </div>
        </div>

        <div className="md:col-span-2">
          <AssortmentLinkForm assortmentId={assortmentId} />
        </div>
      </div>

      <div className="mt-10 md:grid md:grid-cols-3 md:gap-6">
        <div className="mb-4 md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-slate-900 dark:text-white">
              {formatMessage({
                id: 'assortment_links_list',
                defaultMessage: 'Linked assortments',
              })}
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco
            </p>
          </div>
        </div>
        <div className="w-full md:col-span-2">
          {loading ? (
            <Loading />
          ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <AssortmentLinksList
                currentAssortmentId={assortmentId}
                links={linkedAssortments || []}
                onRemoveLink={onRemoveLink}
              />
            </DragDropContext>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssortmentLinks;
