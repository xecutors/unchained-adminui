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
  console.log(isParent);
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
          <div className="flex flex-col justify-center space-x-6 py-4 flex-auto">
            <div className="flex grow shrink basis-2/5">
              <div className="flex items-center pr-4 grow-0 shrink-0 basis-[22%]">
                <Badge color="cyan" text={isParent ? 'Parent' : 'Descendant'} />
              </div>
              <div className="flex flex-wrap flex-auto">
                <h3 className="text-lg flex-auto">{link?.texts?.title}</h3>
                {link?.texts?.title && (
                  <p className="flex-auto text-xs text-slate-600 my-auto">
                    {link?.texts?.subtitle}
                  </p>
                )}
              </div>
            </div>
            {link?.tags && (
              <div className="space-x-2 grow shrink basis-2/5">
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
