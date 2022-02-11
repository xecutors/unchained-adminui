import { TrashIcon } from '@heroicons/react/solid';

const AssortmentLinksListItem = ({ link, onDelete }) => {
  return (
    <div
      className="flex justify-between items-center  border-gray-200 border-b last:border-none"
      key={link.id}
    >
      <div className="flex items-center space-x-6 py-4">
        <div className="">
          <h3 className="text-lg text-gray-800">{link.title}</h3>
          <p className="text-xs text-gray-600">{link.description}</p>
        </div>
      </div>
      <div onClick={onDelete}>
        <TrashIcon className="h-5 w-5 cursor-pointer text-red-400" />
      </div>
    </div>
  );
};

export default AssortmentLinksListItem;
