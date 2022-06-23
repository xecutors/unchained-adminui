import { useIntl } from 'react-intl';
import { Droppable } from 'react-beautiful-dnd';
import classNames from 'classnames';
import NoData from '../../common/components/NoData';
import AssortmentLinksListItem from './AssortmentLinksListItem';

const AssortmentLinksList = ({ currentAssortmentId, links, onRemoveLink }) => {
  const { formatMessage } = useIntl();
  return links.length ? (
    <Droppable droppableId="assortment-links">
      {(provided, snapshot) => (
        <div
          className={classNames(
            'space-y-4 py-3 px-6 rounded transition-[background-color] ease-in-out delay-200',
            {
              'bg-slate-100 dark:bg-slate-500': snapshot.isDraggingOver,
            },
          )}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {links.map((link, index) => {
            const { child, parent, _id } = link;
            const comp = [];
            if (parent && parent._id !== currentAssortmentId) {
              comp.push(
                <AssortmentLinksListItem
                  key={parent._id}
                  link={parent}
                  isParent={parent?.childrenCount}
                  linkId={_id}
                  onDelete={onRemoveLink}
                  index={index}
                />,
              );
            }
            if (child && child._id !== currentAssortmentId) {
              comp.push(
                <AssortmentLinksListItem
                  key={child._id}
                  link={child}
                  linkId={_id}
                  isParent={child._id === currentAssortmentId}
                  onDelete={onRemoveLink}
                  index={index}
                />,
              );
            }

            return comp;
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  ) : (
    <>
      <NoData
        message={formatMessage({
          id: 'linked_assortment',
          defaultMessage: 'Linked assortment',
        })}
      />
    </>
  );
};

export default AssortmentLinksList;
