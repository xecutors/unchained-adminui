import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { DragDropContext } from 'react-beautiful-dnd';
import MediaUploader from '../../common/components/MediaUploader';
import DangerMessage from '../../modal/components/DangerMessage';
import useModal from '../../modal/hooks/useModal';
import useAddAssortmentMedia from '../hooks/useAddAssortmentMedia';

import useAssortmentMedia from '../hooks/useAssortmentMedia';
import useRemoveAssortmentMedia from '../hooks/useRemoveAssortmentMedia';
import useReorderAssortmentMedia from '../hooks/useReorderAssortmentMedia';
import AssortmentMediaList from './AssortmentMediaList';

const AssortmentMediaForm = ({ assortmentId, selectedLocale }) => {
  const { assortmentMedia } = useAssortmentMedia({ assortmentId });
  const { formatMessage } = useIntl();
  const { setModal } = useModal();
  const { removeAssortmentMedia } = useRemoveAssortmentMedia();
  const { reorderAssortmentMedia } = useReorderAssortmentMedia();

  const { addAssortmentMedia } = useAddAssortmentMedia();

  const onAddMedia = async (media) => {
    try {
      await addAssortmentMedia({ assortmentId, media });
      toast.success(
        formatMessage({
          id: 'assortment_media_upload',
          defaultMessage: 'Media uploaded successfully',
        }),
      );
    } catch (err) {
      toast.error(
        formatMessage({
          id: 'fail_upload',
          defaultMessage: 'Media upload failed',
        }),
      );
    }
  };

  const onRemoveMedia = async (assortmentMediaId) => {
    await setModal(
      <DangerMessage
        message={formatMessage({
          id: 'delete_assortment_media_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this currency? ',
        })}
        onOkClick={async () => {
          setModal('');
          await removeAssortmentMedia({ assortmentMediaId });
          toast.success(
            formatMessage({
              id: 'assortment_media_deleted',
              defaultMessage: 'Media deleted successfully',
            }),
          );
        }}
        okText={formatMessage({
          id: 'delete_assortment_media',
          defaultMessage: 'Delete media',
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

    const newSortKeys = assortmentMedia.map((media) => ({
      assortmentMediaId: media._id,
      sortKey: media.sortKey,
    }));

    const [removedSortKey] = newSortKeys.splice(source.index, 1);
    newSortKeys.splice(destination.index, 0, removedSortKey);

    const sortKeys = newSortKeys.map((sortKey, index) => ({
      ...sortKey,
      sortKey: index,
    }));

    try {
      await reorderAssortmentMedia({ sortKeys });
      toast.success(
        formatMessage({
          id: 'assortment_media_reorder',
          defaultMessage: 'Media reorder successfully',
        }),
      );
    } catch (error) {
      toast.error(
        formatMessage({
          id: 'fail_reorder',
          defaultMessage: 'Media reorder failed, Try again!',
        }),
      );
    }
  };

  return (
    <div className="mx-auto mt-5 max-w-full bg-white py-6 shadow lg:grid lg:grid-cols-12 lg:gap-4 lg:rounded">
      <div className="mx-auto w-full px-6 lg:col-span-6 lg:col-start-1">
        <MediaUploader onlyDragAndDrop addMedia={onAddMedia} />
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <AssortmentMediaList
          medias={assortmentMedia}
          selectedLocale={selectedLocale}
          onDeleteMedia={onRemoveMedia}
        />
      </DragDropContext>
    </div>
  );
};

export default AssortmentMediaForm;
