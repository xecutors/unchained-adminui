import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import MediaUploader from '../../common/components/MediaUploader';
import DangerMessage from '../../modal/components/DangerMessage';
import useModal from '../../modal/hooks/useModal';

import useAssortmentMedia from '../hooks/useAssortmentMedia';
import useRemoveAssortmentMedia from '../hooks/useRemoveAssortmentMedia';
import AssortmentMediaList from './AssortmentMediaList';

const AssortmentMediaForm = ({ assortmentId, selectedLocale }) => {
  const { assortmentMedia } = useAssortmentMedia({ assortmentId });
  const { formatMessage } = useIntl();
  const { setModal } = useModal();
  const { removeAssortmentMedia } = useRemoveAssortmentMedia();

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
            formatMessage(
              {
                id: 'assortment_media_deleted',
                defaultMessage:
                  'media {assortmentMediaId} deleted successfully',
              },
              {
                assortmentMediaId,
              },
            ),
          );
        }}
        okText={formatMessage({
          id: 'delete_assortment_media',
          defaultMessage: 'Delete media',
        })}
      />,
    );
  };

  return (
    <div className="mx-auto mt-5 max-w-full bg-white py-6 shadow sm:grid sm:grid-cols-12 sm:gap-4 sm:rounded">
      <div className="mx-auto w-full px-6 pb-6 sm:col-span-6 sm:col-start-1">
        <MediaUploader onlyDragAndDrop />
      </div>
      <AssortmentMediaList
        medias={assortmentMedia}
        selectedLocale={selectedLocale}
        onDeleteMedia={onRemoveMedia}
      />
    </div>
  );
};

export default AssortmentMediaForm;
