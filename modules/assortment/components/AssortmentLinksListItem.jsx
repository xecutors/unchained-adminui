import classNames from 'classnames';
import { Draggable } from 'react-beautiful-dnd';
import Badge from '../../common/components/Badge';
import DeleteButton from '../../common/components/DeleteButton';

const AssortmentLinksListItem = ({
  link,
  onDelete,
  linkId,
  isParent,
  index,
}) => {
  return (
    <Draggable draggableId={link._id} index={index}>
      {(provided, snapshot) => (
        <div
          className={classNames(
            'flex items-center justify-between rounded border-b px-2 text-slate-900 dark:text-white border-gray-200 last:border-none hover:cursor-move',
            {
              'bg-slate-100 dark:bg-slate-500 border-2 border-b-2 rounded':
                snapshot.isDragging,
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
              <h3 className="text-lg ">{link?.texts?.title}</h3>
              <p className="text-xs text-slate-600">{link?.texts?.subtitle}</p>
            </div>
            {link?.tags && (
              <div className="space-x-2">
                {link?.tags.map((tag, key) => (
                  <span
                    key={`${tag}${key + 1}`}
                    className="rounded border px-1 text-sm font-light capitalize shadow-sm dark:shadow-white"
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
