import MediaListItem from '../../common/components/MediaListItem';

import useTranslatedProductMediaTexts from '../hooks/useTranslatedProductMediaTexts';

const ProductMediaListItem = ({ media, isEdit, onEdit, onDelete, locale }) => {
  const { translatedMediaTexts } = useTranslatedProductMediaTexts({
    productMediaId: media._id,
  });
  const mediaText =
    translatedMediaTexts?.find((text) => text.locale === locale) || {};

  return (
    <MediaListItem
      media={media}
      mediaText={mediaText}
      isEdit={isEdit}
      onDelete={onDelete}
      onEdit={onEdit}
    />
  );
};

export default ProductMediaListItem;
