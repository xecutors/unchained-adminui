import { useIntl } from 'react-intl';
import Table from '../../common/components/Table';
import TagListItem from './TagListItem';

interface TagData {
  name: string;
  usage: {
    products: number;
    assortments: number;
    total: number;
  };
  lastUsed?: Date;
}

interface TagListProps {
  tags: TagData[];
  sortable?: boolean;
}

const TagList = ({ tags, sortable = false }: TagListProps) => {
  const { formatMessage } = useIntl();

  if (!tags || tags.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500 dark:text-slate-400">
        {formatMessage({
          id: 'no_tags_found',
          defaultMessage: 'No tags found',
        })}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        {/* Table Header */}
        <Table.Row header enablesort={sortable}>
          <Table.Cell sortKey="name">
            {formatMessage({
              id: 'tag_name',
              defaultMessage: 'Tag Name',
            })}
          </Table.Cell>
          <Table.Cell sortKey="usage">
            {formatMessage({
              id: 'total_usage',
              defaultMessage: 'Total Usage',
            })}
          </Table.Cell>
          <Table.Cell>
            {formatMessage({
              id: 'products_usage',
              defaultMessage: 'Products',
            })}
          </Table.Cell>
          <Table.Cell>
            {formatMessage({
              id: 'assortments_usage',
              defaultMessage: 'Assortments',
            })}
          </Table.Cell>
          <Table.Cell>
            {formatMessage({
              id: 'actions',
              defaultMessage: 'Actions',
            })}
          </Table.Cell>
        </Table.Row>

        {/* Table Body */}
        {tags.map((tag) => (
          <TagListItem
            key={tag.name}
            tag={tag}
          />
        ))}
      </Table>
    </div>
  );
};

export default TagList;