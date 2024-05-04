import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import MediaUploader from '../../common/components/MediaUploader';
import DangerMessage from '../../modal/components/DangerMessage';
import useModal from '../../modal/hooks/useModal';
import useAddAssortmentMedia from '../hooks/useAddAssortmentMedia';

import useAssortmentMedia from '../hooks/useAssortmentMedia';
import useRemoveAssortmentMedia from '../hooks/useRemoveAssortmentMedia';
import useReorderAssortmentMedia from '../hooks/useReorderAssortmentMedia';
import AssortmentMediaList from './AssortmentMediaList';
import useTranslatedAssortmentTexts from '../hooks/useTranslatedAssortmentTexts';
import { useEffect } from 'react';

const AssortmentMediaForm = ({
  assortmentId,
  selectedLocale = null,
  addAdditionalLocales = null,
}) => {
  const { assortmentMedia } = useAssortmentMedia({ assortmentId });
  const { translatedAssortmentTexts } = useTranslatedAssortmentTexts({
    assortmentId,
  });
  const { formatMessage } = useIntl();
  const { setModal } = useModal();
  const { removeAssortmentMedia } = useRemoveAssortmentMedia();
  const { reorderAssortmentMedia } = useReorderAssortmentMedia();
  const { addAssortmentMedia } = useAddAssortmentMedia();

  const items = assortmentMedia?.map((media) => media._id);

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
        onCancelClick={async () => setModal('')}
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

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);

      const sortedItems = newItems.map((id, index) => ({
        assortmentMediaId: id,
        sortKey: index,
      }));

      try {
        await reorderAssortmentMedia({ sortKeys: sortedItems });
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
    } else {
      toast.info(
        formatMessage({
          id: 'reorder_original',
          defaultMessage: 'Reorder to original location',
        }),
      );
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    if (typeof addAdditionalLocales === 'function')
      addAdditionalLocales(translatedAssortmentTexts.map((l) => l.locale));
  }, [translatedAssortmentTexts, selectedLocale]);
  return (
    <div className="mx-auto mt-5 max-w-full bg-white dark:bg-slate-800 py-6 shadow-sm dark:shadow-none lg:grid lg:grid-cols-12 lg:gap-4 lg:rounded-sm">
      <div className="mx-auto w-full px-6 lg:col-span-6 lg:col-start-1">
        <MediaUploader onlyDragAndDrop addMedia={onAddMedia} />
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        id="assortment-media"
      >
        <AssortmentMediaList
          medias={assortmentMedia}
          selectedLocale={selectedLocale}
          onDeleteMedia={onRemoveMedia}
          items={items}
        />
      </DndContext>
    </div>
  );
};

export default AssortmentMediaForm;
