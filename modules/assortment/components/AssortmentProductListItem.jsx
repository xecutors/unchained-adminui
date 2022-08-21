import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import Badge from '../../common/components/Badge';
import DeleteButton from '../../common/components/DeleteButton';

const AssortmentProductListItem = ({ link, onDelete, id }) => {
  const { _id, product, tags } = link;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center justify-between px-2 rounded border-b border-slate-200 dark:border-slate-600 last:border-none hover:cursor-move"
    >
      <div className="flex items-center space-x-6 py-4">
        <div>
          <h3 className="text-lg text-slate-800 dark:text-slate-200">
            {product?.texts?.title}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-200">
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
  );
};

export default AssortmentProductListItem;
