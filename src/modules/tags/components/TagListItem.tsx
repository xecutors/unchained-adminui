import { useIntl } from 'react-intl';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Badge from '../../common/components/Badge';
import Table from '../../common/components/Table';
import useUpdateTag from '../hooks/useUpdateTag';
import useModal from '../../modal/hooks/useModal';
import DangerMessage from '../../modal/components/DangerMessage';

interface TagData {
  name: string;
  usage: {
    products: number;
    assortments: number;
    total: number;
  };
  lastUsed?: Date;
}

interface TagListItemProps {
  tag: TagData;
}

const TagListItem = ({ tag }: TagListItemProps) => {
  const { formatMessage } = useIntl();
  const router = useRouter();
  const { deleteTag } = useUpdateTag();
  const { setModal } = useModal();

  const handleEdit = () => {
    // For custom tags, route to edit page. For system tags, could open inline edit or modal
    if (tag.name.includes('sample') || localStorage.getItem('customTags')?.includes(tag.name)) {
      router.push(`/tags?tagId=${encodeURIComponent(tag.name)}`);
    } else {
      // For system-generated tags from products/assortments, show info modal
      toast.info(
        formatMessage({
          id: 'system_tag_info',
          defaultMessage: 'This tag is automatically generated from your content. Edit the source products or assortments to modify.',
        }),
      );
    }
  };

  const handleDelete = async () => {
    if (tag.usage.total > 0) {
      toast.warning(
        formatMessage({
          id: 'cannot_delete_tag_in_use',
          defaultMessage: 'Cannot delete tag that is currently in use. Remove it from all content first.',
        }),
      );
      return;
    }

    await setModal(
      <DangerMessage
        onCancelClick={async () => setModal('')}
        message={formatMessage({
          id: 'delete_tag_confirmation',
          defaultMessage: 'Are you sure you want to delete the tag "{tagName}"? This action cannot be undone.',
        }, { tagName: tag.name })}
        onOkClick={async () => {
          try {
            setModal('');
            await deleteTag(tag.name);
            toast.success(
              formatMessage({
                id: 'tag_deleted_successfully',
                defaultMessage: 'Tag deleted successfully',
              }),
            );
            // Refresh the page to update the list
            router.reload();
          } catch (error) {
            toast.error(
              formatMessage({
                id: 'tag_deletion_failed',
                defaultMessage: 'Failed to delete tag',
              }),
            );
          }
        }}
        okText={formatMessage({
          id: 'delete_tag',
          defaultMessage: 'Delete Tag',
        })}
      />,
    );
  };

  return (
    <Table.Row className="group">
      {/* Tag Name */}
      <Table.Cell>
        <div className="flex items-center">
          <Badge
            text={tag.name}
            color="slate"
            className="text-sm font-medium"
          />
        </div>
      </Table.Cell>

      {/* Total Usage */}
      <Table.Cell className="whitespace-nowrap px-6">
        <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
          {tag.usage.total}
        </div>
      </Table.Cell>

      {/* Products Usage */}
      <Table.Cell className="whitespace-nowrap px-6">
        <div className="text-sm text-slate-900 dark:text-slate-300">
          {tag.usage.products}
          {tag.usage.products > 0 && (
            <Link 
              href={`/products?tags=${encodeURIComponent(tag.name)}`}
              className="ml-2 text-blue-600 dark:text-blue-400 hover:underline"
            >
              {formatMessage({
                id: 'view_products',
                defaultMessage: 'view',
              })}
            </Link>
          )}
        </div>
      </Table.Cell>

      {/* Assortments Usage */}
      <Table.Cell className="whitespace-nowrap px-6">
        <div className="text-sm text-slate-900 dark:text-slate-300">
          {tag.usage.assortments}
          {tag.usage.assortments > 0 && (
            <Link 
              href={`/assortments?tags=${encodeURIComponent(tag.name)}`}
              className="ml-2 text-blue-600 dark:text-blue-400 hover:underline"
            >
              {formatMessage({
                id: 'view_assortments',
                defaultMessage: 'view',
              })}
            </Link>
          )}
        </div>
      </Table.Cell>

      {/* Actions */}
      <Table.Cell className="whitespace-nowrap px-6">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleEdit}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            title={formatMessage({
              id: 'edit_tag',
              defaultMessage: 'Edit tag',
            })}
          >
            <PencilIcon className="w-4 h-4" />
          </button>
          
          {tag.usage.total === 0 && (
            <button
              onClick={handleDelete}
              className="text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              title={formatMessage({
                id: 'delete_tag',
                defaultMessage: 'Delete tag',
              })}
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      </Table.Cell>
    </Table.Row>
  );
};

export default TagListItem;