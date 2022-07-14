import { FormattedMessage, useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { DragDropContext } from 'react-beautiful-dnd';

import Loading from '../../common/components/Loading';
import DangerMessage from '../../modal/components/DangerMessage';
import useModal from '../../modal/hooks/useModal';
import useAssortmentLinks from '../hooks/useAssortmentLinks';
import useRemoveAssortmentLink from '../hooks/useRemoveAssortmentLink';
import AssortmentLinkForm from './AssortmentLinkForm';
import AssortmentLinksList from './AssortmentLinksList';
import useReorderAssortmentLink from '../hooks/useReorderAssortmentLinks';
import SelfDocumentingView from '../../common/components/SelfDocumentingView';

const AssortmentLinks = ({ assortmentId }) => {
  const { formatMessage } = useIntl();
  const { setModal } = useModal();
  const { linkedAssortments, loading } = useAssortmentLinks({ assortmentId });

  const { removeAssortmentLink } = useRemoveAssortmentLink();
  const { reorderAssortmentLink } = useReorderAssortmentLink();

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
            formatMessage({
              id: 'assortment_link',
              defaultMessage: 'Link deleted successfully',
            }),
          );
        }}
        okText={formatMessage({
          id: 'delete_link',
          defaultMessage: 'Delete link',
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

    const newSortKeys = linkedAssortments.map((media) => ({
      assortmentLinkId: media._id,
      sortKey: media.sortKey,
    }));

    const [removedSortKey] = newSortKeys.splice(source.index, 1);
    newSortKeys.splice(destination.index, 0, removedSortKey);

    const sortKeys = newSortKeys.map((sortKey, index) => ({
      ...sortKey,
      sortKey: index,
    }));

    try {
      await reorderAssortmentLink({ sortKeys });
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
  };

  return (
    <>
      <SelfDocumentingView
        documentationLabel={formatMessage({
          id: 'assortment_link_form_header',
          defaultMessage: 'Child assortments',
        })}
        className="mt-2 sm:mt-0"
        documentation={
          <FormattedMessage
            id="assortment_link_form_description"
            defaultMessage="<ul> <li>Assign assortment that are direct child of this assortment </li>
          </ul>"
            values={{
              ul: (chunk) => <ul className="list-disc list-inside">{chunk} </ul>,
              li: (chunk) => <li>{chunk} </li>,
            }}
          />
        }
      >
        <AssortmentLinkForm assortmentId={assortmentId} />
      </SelfDocumentingView>
      <SelfDocumentingView
        documentationLabel={formatMessage({
          id: 'assortment_links_header',
          defaultMessage: 'Assortment links',
        })}
        className="sm:mt-4"
        documentation={
          <FormattedMessage
            id="assortment_link_list_description"
            defaultMessage="<ul> <li>All assortments found on the assortment relation tree</li>
            <li> Drag and drop list items to sort assortment links </li>
         <li> Parents are assortments found in the ancestors tree on any level </li>
         <li> Descendants are assortments found in the children tree on any level </li> </ul>"
            values={{
              ul: (chunk) => <ul className="list-disc list-inside">{chunk} </ul>,
              li: (chunk) => <li>{chunk} </li>,
            }}
          />
        }
      >
        {loading ? (
          <Loading />
        ) : (
          <div className="ml-auto shadow dark:shadow-none dark:bg-slate-900 w-full md:col-span-2 bg-white">
            <DragDropContext onDragEnd={handleDragEnd}>
              <AssortmentLinksList
                currentAssortmentId={assortmentId}
                links={linkedAssortments || []}
                onRemoveLink={onRemoveLink}
              />
            </DragDropContext>
          </div>
        )}
      </SelfDocumentingView>
    </>
  );
};

export default AssortmentLinks;
