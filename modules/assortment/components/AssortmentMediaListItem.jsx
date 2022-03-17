import MediaListItem from '../../common/components/MediaListItem';
import useTranslatedAssortmentMediaTexts from '../hooks/useTranslatedAssortmentMediaTexts';

const AssortmentMediaListItem = ({
  media,
  isEdit,
  onEdit,
  onDelete,
  locale,
}) => {
  const { translatedAssortmentMediaTexts } = useTranslatedAssortmentMediaTexts({
    assortmentMediaId: media._id,
  });

  const mediaText =
    translatedAssortmentMediaTexts?.find((text) => text.locale === locale) ||
    {};
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

export default AssortmentMediaListItem;
