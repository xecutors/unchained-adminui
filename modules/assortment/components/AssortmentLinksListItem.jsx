import { TrashIcon } from '@heroicons/react/solid';
import Badge from '../../common/components/Badge';

const AssortmentLinksListItem = ({ link, onDelete, linkId, isParent }) => {
  return (
    <div
      className="flex justify-between items-center border-gray-200 border-b last:border-none"
      key={link._id}
    >
      <div className="flex items-center space-x-6 py-4">
        <div className="flex">
          <div className="flex items-center space-x-6 pr-4">
            <Badge color="cyan" text={isParent ? 'Parent' : 'Descendant'} />
          </div>
          <h3 className="text-lg text-gray-800">{link?.texts?.title}</h3>
          <p className="text-xs text-gray-600">{link?.texts?.subtitle}</p>
        </div>
      </div>
      <div onClick={() => onDelete(linkId)}>
        <TrashIcon className="h-5 w-5 cursor-pointer text-red-400" />
      </div>
    </div>
  );
};

export default AssortmentLinksListItem;
