import { useIntl } from 'react-intl';
import { Droppable } from 'react-beautiful-dnd';
import NoData from '../../common/components/NoData';
import AssortmentLinksListItem from './AssortmentLinksListItem';

const AssortmentLinksList = ({
  currentAssortmentId,
  links,
  onRemoveLink,
  setIsDraggingOver,
}) => {
  const { formatMessage } = useIntl();

  return links.length ? (
    <Droppable droppableId="assortment-links">
      {(provided, snapshot) => (
        <span
          key={Date.now()}
          className="space-y-4"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {setIsDraggingOver(snapshot.isDraggingOver)}
          {links.map((link, index) => {
            const { child, parent, _id } = link;
            const comp = [];
            if (parent && parent._id !== currentAssortmentId)
              comp.push(
                <AssortmentLinksListItem
                  key={parent._id}
                  link={parent}
                  isParent={parent._id === currentAssortmentId}
                  linkId={_id}
                  onDelete={onRemoveLink}
                  i={index}
                />,
              );
            if (child && child._id !== currentAssortmentId)
              comp.push(
                <AssortmentLinksListItem
                  key={child._id}
                  link={child}
                  linkId={_id}
                  isParent={child._id !== currentAssortmentId}
                  onDelete={onRemoveLink}
                  i={index}
                />,
              );

            return comp;
          })}
        </span>
      )}
    </Droppable>
  ) : (
    <NoData
      message={formatMessage({
        id: 'linked-message',
        defaultMessage: 'Linked assortment',
      })}
    />
  );
};

export default AssortmentLinksList;
