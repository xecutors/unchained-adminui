import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import DangerMessage from '../../modal/components/DangerMessage';
import useModal from '../../modal/hooks/useModal';
import useAssortmentLinks from '../hooks/useAssortmentLinks';
import useRemoveAssortmentLink from '../hooks/useRemoveAssortmentLink';
import AssortmentLinkForm from './AssortmentLinkForm';
import AssortmentLinksList from './AssortmentLinksList';

const AssortmentLinks = ({ assortmentId }) => {
  const { formatMessage } = useIntl();
  const { setModal } = useModal();
  const { linkedAssortments } = useAssortmentLinks({ assortmentId });

  const { removeAssortmentLink } = useRemoveAssortmentLink();

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

  return (
    <div className="mt-4 sm:max-w-full">
      <div className="py-2 px-5 shadow sm:rounded-t sm:px-15">
        <div className="space-y-2 sm:p-6 rounded-md relative max-w-full lg:grid lg:grid-cols-3">
          <div className="pb-2 mb-7 border-gray-200 sm:flex  col-span-1">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {formatMessage({
                id: 'links',
                defaultMessage: 'Links',
              })}
            </h3>
          </div>

          <div className="col-span-2 w-full ml-auto lg:shadow-md border-gray-200  bg-white px-8">
            <AssortmentLinkForm assortmentId={assortmentId} />
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-3 px-6 border-gray-200 border-b pb-8">
          <div className="pb-2 pt-4 mb-7 border-gray-200 sm:flex  col-span-1">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {formatMessage({
                id: 'assortment_links',
                defaultMessage: 'Assortment links',
              })}
            </h3>
          </div>
          <div className="col-span-2 w-full py-2 ml-auto shadow-md px-6">
            <AssortmentLinksList
              currentAssortmentId={assortmentId}
              links={linkedAssortments || []}
              onRemoveLink={onRemoveLink}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssortmentLinks;
