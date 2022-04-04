import classNames from 'classnames';
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Badge from '../../common/components/Badge';
import DeleteButton from '../../common/components/DeleteButton';

const AssortmentProductListItem = ({ link, onDelete, i }) => {
  const { _id, product, tags } = link;

  const [isDragging, setIsDragging] = useState(false);

  return (
    <Draggable draggableId={_id} index={i}>
      {(provided, snapshot) => (
        <div
          key={_id}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          draggable="true"
          className={classNames(
            'flex items-center justify-between bg-white border-b border-gray-200 last:border-none cursor-move',
            {
              'bg-slate-100': isDragging,
            },
          )}
        >
          {setIsDragging(snapshot.isDragging)}

          <div className="flex items-center space-x-6 py-4">
            <div>
              <h3 className="text-lg text-slate-800">
                {product?.texts?.title}
              </h3>
              <p className="text-xs text-slate-600">
                {product?.texts?.subtitle}
              </p>
            </div>
          </div>
          <div>
            {(tags || [])?.map((tag) => (
              <Badge text={tag} color="cyan" key={tag} />
            ))}
          </div>
          <DeleteButton onClick={() => onDelete(_id)} />
        </div>
      )}
    </Draggable>
  );
};

export default AssortmentProductListItem;
