import { useIntl } from 'react-intl';

import Badge from '../../common/components/Badge';
import DeleteButton from '../../common/components/DeleteButton';

const AssortmentFiltersListItem = ({ link, onDelete }) => {
  const { formatMessage } = useIntl();
  const { _id, filter, tags } = link;

  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-200 last:border-none">
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
        <h3 className="text-lg text-slate-800">
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
