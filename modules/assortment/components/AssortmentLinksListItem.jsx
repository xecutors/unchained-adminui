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
            'flex items-center justify-between rounded border-b px-2 text-slate-900 dark:text-slate-200 border-slate-200 dark:border-slate-800 last:border-none hover:cursor-move',
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
              <div className="flex-auto">
                <div className="flex flex-wrap">
                  <h3 className="text-lg flex-auto">{link?.texts?.title}</h3>
                  {link?.texts?.title && (
                    <p className="flex-auto text-xs text-slate-600 my-auto">
                      {link?.texts?.subtitle}
                    </p>
                  )}
                </div>
                {link?.tags && (
                  <div className="flex gap-2">
                    {link?.tags.map((tag, key) => (
                      <Badge
                        key={`${tag}${key + 1}`}
                        text={tag}
                        color="blue"
                        className="px-3 text-sm font-light capitalize py-0"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <DeleteButton onClick={() => onDelete(linkId)} />
        </div>
      )}
    </Draggable>
  );
};

export default AssortmentLinksListItem;
