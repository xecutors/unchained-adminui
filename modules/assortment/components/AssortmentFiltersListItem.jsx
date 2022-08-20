import React from 'react';
import { useIntl } from 'react-intl';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import Badge from '../../common/components/Badge';
import DeleteButton from '../../common/components/DeleteButton';

const AssortmentFiltersListItem = ({ link, onDelete, id }) => {
  const { formatMessage } = useIntl();

  const { _id, filter, tags } = link;
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
      className="flex items-center justify-between rounded px-2 gap-4 border-b border-slate-200 dark:border-slate-600 last:border-none hover:cursor-move"
    >
      <div className="shrink-0 grow-0 basis-20 space-y-1 p-2">
        <Badge
          color={filter?.isActive ? 'green' : 'slate'}
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
        <h3 className="text-lg text-slate-800 dark:text-slate-200">
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
  );
};

export default AssortmentFiltersListItem;
