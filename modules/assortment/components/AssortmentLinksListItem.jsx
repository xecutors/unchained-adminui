import { TrashIcon } from '@heroicons/react/solid';
import Badge from '../../common/components/Badge';

const AssortmentLinksListItem = ({ link, onDelete, linkId, isParent }) => {
  return (
    <div
      className="flex items-center justify-between border-b border-gray-200 last:border-none"
      key={link._id}
    >
      <div className="flex flex-col justify-center space-x-6 py-4">
        <div className="flex">
          <div className="flex items-center space-x-6 pr-4">
            <Badge color="cyan" text={isParent ? 'Parent' : 'Descendant'} />
          </div>
          <h3 className="text-lg text-gray-800">{link?.texts?.title}</h3>
          <p className="text-xs text-gray-600">{link?.texts?.subtitle}</p>
        </div>
        {link?.tags && (
          <div className="space-x-2">
            {link?.tags.map((tag, index) => (
              <span
                key={`${tag}${index + 1}`}
                className="rounded border bg-white px-1 text-sm font-light capitalize text-gray-900 shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div onClick={() => onDelete(linkId)}>
        <TrashIcon className="h-5 w-5 cursor-pointer text-red-400" />
      </div>
    </div>
  );
};

export default AssortmentLinksListItem;
