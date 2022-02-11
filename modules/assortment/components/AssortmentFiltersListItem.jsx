import { TrashIcon } from '@heroicons/react/solid';
import Badge from '../../common/components/Badge';

const AssortmentFiltersListItem = ({ link, onDelete }) => {
  const { _id, filter, tags } = link;

  return (
    <div className="flex justify-between items-center border-gray-200 border-b last:border-none">
      <div className="space-y-1 ">
        <h3 className="text-lg text-gray-800">
          ({filter?.key}) {filter?.texts?.title}
        </h3>
        <p className="text-xs text-gray-600">{filter?.texts?.subtitle}</p>
        <Badge color="indigo" text={filter?.type} />
      </div>
      <div className="space-y-1 ">
        <Badge
          color={filter?.isActive ? 'green' : 'gray'}
          text={filter?.isActive ? 'Active' : 'In-Active'}
        />
      </div>
      <div className="space-y-1 ">
        {tags?.map((tag) => (
          <Badge color="indigo" text={tag} />
        ))}
      </div>
      <div onClick={() => onDelete(_id)}>
        <TrashIcon className="h-5 w-5 cursor-pointer text-red-400" />
      </div>
    </div>
  );
};

export default AssortmentFiltersListItem;
