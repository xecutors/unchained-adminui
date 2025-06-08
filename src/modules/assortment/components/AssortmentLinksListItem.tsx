import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useRouter } from 'next/router';
import Badge from '../../common/components/Badge';
import DeleteButton from '../../common/components/DeleteButton';
import DraggableIcon from '../../common/components/DraggableIcon';
import generateUniqueId from '../../common/utils/getUniqueId';

const AssortmentLinksListItem = ({ link, onDelete, linkId, isParent, id }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const router = useRouter();
  return (
    <div
      className="flex items-center justify-between rounded-sm border-b px-2 text-slate-900 dark:text-slate-200 border-slate-200 dark:border-slate-600 last:border-none hover:cursor-pointer"
      ref={setNodeRef}
      onClick={() => {
        router.push(`/assortments?assortmentSlug=${generateUniqueId(link)}`);
      }}
      style={style}
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
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="hover:cursor-move"
        >
          <DraggableIcon />
        </button>
        <DeleteButton onClick={() => onDelete(linkId)} />
      </div>
    </div>
  );
};

export default AssortmentLinksListItem;
