import { useIntl } from 'react-intl';
import { Draggable } from 'react-beautiful-dnd';
import classNames from 'classnames';

import Badge from '../../common/components/Badge';
import DeleteButton from '../../common/components/DeleteButton';

const AssortmentFiltersListItem = ({ link, onDelete, index }) => {
  const { formatMessage } = useIntl();

  const { _id, filter, tags } = link;

  return (
    <Draggable draggableId={_id} index={index}>
      {(provided, snapshot) => (
        <div
          key={_id}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          draggable="true"
          className={classNames(
            'flex items-center justify-between gap-4 border-b bg-white border-gray-200 last:border-none cursor-move',
            {
              'bg-slate-100': snapshot.isDragging,
            },
          )}
        >
          <div className="shrink-0 grow-0 basis-20 space-y-1 p-2">
            <Badge
              color={filter?.isActive ? 'green' : 'gray'}
              text={
                filter?.isActive
                  ? formatMessage({ id: 'active', defaultMessage: 'Active' })
                  : formatMessage({
                      id: 'inactive',
                      defaultMessage: 'In-Active',
                    })
              }
            />
          </div>
          <div className="shrink grow basis-1/3 space-y-1 p-2">
            <h3 className="text-lg text-slate-800">
              ({filter?.key}) {filter?.texts?.title}
            </h3>
            <p className="text-xs text-slate-600">{filter?.texts?.subtitle}</p>
            <Badge color="indigo" text={filter?.type} />
          </div>
          <div className="basis-1/4 space-y-1 p-2">
            {tags?.map((tag) => (
              <Badge color="indigo" text={tag} key={tag} />
            ))}
          </div>
          <DeleteButton onClick={() => onDelete(_id)} />
        </div>
      )}
    </Draggable>
  );
};

export default AssortmentFiltersListItem;
