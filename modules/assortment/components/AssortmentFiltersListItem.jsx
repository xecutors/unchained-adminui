import { TrashIcon } from '@heroicons/react/solid';

const AssortmentFiltersListItem = ({ filter, onDelete }) => {
  return (
    <div
      key={filter.id}
      className="flex justify-between items-center border-gray-200 border-b last:border-none"
    >
      <div className="space-y-1 py-4">
        <h3 className="text-lg text-gray-800">{filter.title}</h3>
        <p className="text-xs text-gray-600">{filter.desc}</p>
      </div>
      <div onClick={onDelete}>
        <TrashIcon className="h-5 w-5 cursor-pointer text-red-400" />
      </div>
    </div>
  );
};

export default AssortmentFiltersListItem;
