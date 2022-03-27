import { TrashIcon } from '@heroicons/react/solid';
import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';

const AssortmentFiltersListItem = ({ link, onDelete }) => {
  const { formatMessage } = useIntl();
  const { _id, filter, tags } = link;

  return (
    <div className="flex items-center justify-between gap-4 border-b border-gray-200 last:border-none">
      <div className="shrink-0 grow-0 basis-20 space-y-1 p-2">
        <Badge
          color={filter?.isActive ? 'green' : 'gray'}
          text={
            filter?.isActive
              ? formatMessage({ id: 'active', defaultMessage: 'Active' })
              : formatMessage({ id: 'inactive', defaultMessage: 'In-Active' })
          }
        />
      </div>
      <div className="shrink grow basis-1/3 space-y-1 p-2">
        <h3 className="text-lg text-gray-800">
          ({filter?.key}) {filter?.texts?.title}
        </h3>
        <p className="text-xs text-gray-600">{filter?.texts?.subtitle}</p>
        <Badge color="indigo" text={filter?.type} />
      </div>
      <div className="basis-1/4 space-y-1 p-2">
        {tags?.map((tag) => (
          <Badge color="indigo" text={tag} key={tag} />
        ))}
      </div>
      <div className=" p-2" onClick={() => onDelete(_id)}>
        <TrashIcon className="h-5 w-5 cursor-pointer text-red-400" />
      </div>
    </div>
  );
};

export default AssortmentFiltersListItem;
