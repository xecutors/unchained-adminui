import MediaListItem from '../../common/components/MediaListItem';
import useTranslatedAssortmentMediaTexts from '../hooks/useTranslatedAssortmentMediaTexts';
import useUpdateAssortmentMediaTexts from '../hooks/useUpdateAssortmentMediaTexts';

const AssortmentMediaListItem = ({
  media,
  isEdit,
  onEdit,
  onDelete,
  locale,
}) => {
  const { updateAssortmentMediaTexts } = useUpdateAssortmentMediaTexts();
  const { translatedAssortmentMediaTexts } = useTranslatedAssortmentMediaTexts({
    assortmentMediaId: media._id,
  });

  const mediaText =
    translatedAssortmentMediaTexts?.find((text) => text.locale === locale) ||
    {};

  const onUpdateMediaText = async ({ title, subtitle }) => {
    await updateAssortmentMediaTexts({
      assortmentMediaId: media._id,
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

export default AssortmentMediaListItem;
