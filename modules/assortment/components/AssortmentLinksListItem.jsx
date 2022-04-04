import classNames from 'classnames';
import { Draggable } from 'react-beautiful-dnd';
import Badge from '../../common/components/Badge';
import DeleteButton from '../../common/components/DeleteButton';

const AssortmentLinksListItem = ({ link, onDelete, linkId, isParent, i }) => {
  return (
    <Draggable draggableId={link._id} index={i}>
      {(provided, snapshot) => (
        <div
          className={classNames(
            'flex items-center justify-between border-b bg-white border-gray-200 last:border-none cursor-move',
            {
              'bg-slate-100': snapshot.isDragging,
            },
          )}
          key={link._id}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          draggable="true"
        >
          <div className="flex flex-col justify-center space-x-6 py-4">
            <div className="flex">
              <div className="flex items-center space-x-6 pr-4">
                <Badge color="cyan" text={isParent ? 'Parent' : 'Descendant'} />
              </div>
              <h3 className="text-lg text-slate-800">{link?.texts?.title}</h3>
              <p className="text-xs text-slate-600">{link?.texts?.subtitle}</p>
            </div>
            {link?.tags && (
              <div className="space-x-2">
                {link?.tags.map((tag, index) => (
                  <span
                    key={`${tag}${index + 1}`}
                    className="rounded border bg-white px-1 text-sm font-light capitalize text-slate-900 shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <DeleteButton onClick={() => onDelete(linkId)} />
        </div>
      )}
    </Draggable>
  );
};

export default AssortmentLinksListItem;
