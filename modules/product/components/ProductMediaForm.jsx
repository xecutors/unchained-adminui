import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { DragDropContext } from 'react-beautiful-dnd';
import MediaUploader from '../../common/components/MediaUploader';
import DangerMessage from '../../modal/components/DangerMessage';
import useModal from '../../modal/hooks/useModal';
import useAddProductMedia from '../hooks/useAddProductMedia';
import useProductMedia from '../hooks/useProductMedia';
import useRemoveProductMedia from '../hooks/useRemoveProductMedia';

import ProductMediaList from './ProductMediaList';
import useReOrderProductMedia from '../hooks/useReOrderProductMedia';

const ProductMediaForm = ({ productId, selectedLocale }) => {
  const { productMedia } = useProductMedia({ productId });
  const { setModal } = useModal();
  const { formatMessage } = useIntl();

  const { removeProductMedia } = useRemoveProductMedia();
  const { addProductMedia } = useAddProductMedia();
  const { reOrderProductMedia } = useReOrderProductMedia();

  const onAddMedia = async (media) => {
    try {
      await addProductMedia({ productId, media });
      toast.success(
        formatMessage({
          id: 'product_media_upload',
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

  const onRemoveMedia = async (productMediaId) => {
    await setModal(
      <DangerMessage
        message={formatMessage({
          id: 'delete_product_media_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this currency? ',
        })}
        onOkClick={async () => {
          setModal('');
          await removeProductMedia({ productMediaId });
          toast.success(
            formatMessage({
              id: 'product_media_deleted',
              defaultMessage: 'Media deleted successfully',
            }),
          );
        }}
        okText={formatMessage({
          id: 'delete_product_media',
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

    const sortKeys = productMedia.map((media, index) => ({
      productMediaId: media._id,
      sortKey: index,
    }));

    const [removedSortKey] = sortKeys.splice(source.index, 1);
    sortKeys.splice(destination.index, 0, removedSortKey);

    sortKeys.map((sortKey, index) => {
      return {
        ...sortKey,
        sortKeys: index,
      };
    });

    try {
      await reOrderProductMedia({ sortKeys });
      toast.success(
        formatMessage({
          id: 'product_media_reorder',
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
        <ProductMediaList
          medias={productMedia}
          selectedLocale={selectedLocale}
          onDeleteMedia={onRemoveMedia}
        />
      </DragDropContext>
    </div>
  );
};

export default ProductMediaForm;
