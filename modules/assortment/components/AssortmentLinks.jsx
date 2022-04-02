import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import Loading from '../../common/components/Loading';
import SelfDocumentingView from '../../common/components/SelfDocumentingView';

import DangerMessage from '../../modal/components/DangerMessage';
import useModal from '../../modal/hooks/useModal';
import useAssortmentLinks from '../hooks/useAssortmentLinks';
import useRemoveAssortmentLink from '../hooks/useRemoveAssortmentLink';
import AssortmentLinkForm from './AssortmentLinkForm';
import AssortmentLinksList from './AssortmentLinksList';

const AssortmentLinks = ({ assortmentId }) => {
  const { formatMessage } = useIntl();
  const { setModal } = useModal();
  const { linkedAssortments, loading } = useAssortmentLinks({ assortmentId });

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
    <>
      <SelfDocumentingView
        documentationLabel={formatMessage({
          id: 'assortment_links',
          defaultMessage: 'Links',
        })}
        documentation="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco"
        mainContent={<AssortmentLinkForm assortmentId={assortmentId} />}
      />
      <SelfDocumentingView
        className="mt-5"
        documentationLabel={formatMessage({
          id: 'assortment_links_list',
          defaultMessage: 'Linked assortments',
        })}
        documentation=" Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco"
        mainContent={
          loading ? (
            <Loading />
          ) : (
            <div className=" bg-white py-2 px-6 shadow">
              <AssortmentLinksList
                currentAssortmentId={assortmentId}
                links={linkedAssortments || []}
                onRemoveLink={onRemoveLink}
              />
            </div>
          )
        }
      />
    </>
  );
};

export default AssortmentLinks;
