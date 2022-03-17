import MediaListItem from '../../common/components/MediaListItem';

import useTranslatedProductMediaTexts from '../hooks/useTranslatedProductMediaTexts';
import useUpdateProductMediaTexts from '../hooks/useUpdateProductMediaTexts';

const ProductMediaListItem = ({ media, isEdit, onEdit, onDelete, locale }) => {
  const { updateProductMediaTexts } = useUpdateProductMediaTexts();
  const { translatedMediaTexts } = useTranslatedProductMediaTexts({
    productMediaId: media._id,
  });
  const mediaText =
    translatedMediaTexts?.find((text) => text.locale === locale) || {};

  const onUpdateMediaText = async ({ title, subtitle }) => {
    await updateProductMediaTexts({
      productMediaId: media._id,
      texts: {
        title,
        locale,
        subtitle,
      },
    });
    onEdit(false);
    return true;
  };

  return (
    <MediaListItem
      media={media}
      mediaText={mediaText}
      isEdit={isEdit}
      onDelete={onDelete}
      onEdit={onEdit}
      onUpdate={onUpdateMediaText}
    />
  );
};

export default ProductMediaListItem;
