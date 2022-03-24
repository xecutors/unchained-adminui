import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import MediaUploader from '../../common/components/MediaUploader';
import DangerMessage from '../../modal/components/DangerMessage';
import useModal from '../../modal/hooks/useModal';
import useProductMedia from '../hooks/useProductMedia';
import useRemoveProductMedia from '../hooks/useRemoveProductMedia';

import ProductMediaList from './ProductMediaList';

const ProductMediaForm = ({ productId, selectedLocale }) => {
  const { productMedia } = useProductMedia({ productId });
  const { setModal } = useModal();
  const { formatMessage } = useIntl();

  const { removeProductMedia } = useRemoveProductMedia();

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
            formatMessage(
              {
                id: 'product_media_deleted',
                defaultMessage: 'media {productMediaId} deleted successfully',
              },
              {
                productMediaId,
              },
            ),
          );
        }}
        okText={formatMessage({
          id: 'delete_product_media',
          defaultMessage: 'Delete media',
        })}
      />,
    );
  };

  return (
    <div className="bg-white mx-auto mt-5 max-w-full py-6 shadow sm:grid sm:grid-cols-12 sm:gap-4 sm:rounded">
      <div className="mx-auto w-full px-6 pt-6 sm:col-span-6 sm:col-start-1">
        <MediaUploader onlyDragAndDrop />
      </div>

      <ProductMediaList
        medias={productMedia}
        selectedLocale={selectedLocale}
        onDeleteMedia={onRemoveMedia}
      />
    </div>
  );
};

export default ProductMediaForm;
