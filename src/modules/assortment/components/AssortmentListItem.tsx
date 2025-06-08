import Link from 'next/link';
import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';
import MediaAvatar from '../../common/components/MediaAvatar';
import Table from '../../common/components/Table';
import generateUniqueId from '../../common/utils/getUniqueId';
import useUpdateAssortment from '../hooks/useUpdateAssortment';

const AssortmentListItem = ({ assortment, showAvatar }) => {
  const { formatMessage } = useIntl();
  const { updateAssortment } = useUpdateAssortment();
  const STATUS = {
    true: formatMessage({ id: 'active', defaultMessage: 'Active' }),
    false: formatMessage({ id: 'in_active', defaultMessage: 'In-Active' }),
  };

  const updateAssortmentSequence = async (e) => {
    if (e.target.value) {
      await updateAssortment({
        assortmentId: assortment?._id,
        assortment: { sequence: parseInt(e.target.value, 10) },
      });
    }
  };

  return (
    <Table.Row>
      <Table.Cell className="whitespace-nowrap">
        <div className="flex items-center text-sm text-slate-900">
          {showAvatar && (
            <MediaAvatar
              file={assortment?.media?.length && assortment.media[0].file}
              className="mr-2"
            />
          )}
          <Link
            href={`/assortments?assortmentSlug=${generateUniqueId(assortment)}`}
            className="text-blue-600 dark:text-blue-400"
          >
            {assortment?.texts?.title || (
              <>
                {assortment._id}{' '}
                <Badge
                  color="blue"
                  text={formatMessage({ id: 'name', defaultMessage: 'Name' })}
                />
              </>
            )}
          </Link>
        </div>
      </Table.Cell>

      <Table.Cell className="whitespace-nowrap">
        <Badge
          text={STATUS[assortment.isActive]}
          color={assortment.isActive ? 'green' : 'red'}
          square
        />
      </Table.Cell>

      <Table.Cell className="whitespace-nowrap">
        <div className="flex items-center text-sm text-slate-900">
          {assortment.isRoot && (
            <Badge
              text={formatMessage({
                id: 'root_assortment',
                defaultMessage: 'Root',
              })}
              color="green"
              square
            />
          )}
        </div>
      </Table.Cell>

      <Table.Cell className="whitespace-nowrap">
        <div className="flex items-center text-sm text-slate-900">
          {assortment.isBase && (
            <Badge
              text={formatMessage({
                id: 'assortment_base',
                defaultMessage: 'Base',
              })}
              color="green"
            />
          )}
        </div>
      </Table.Cell>
      <Table.Cell>
        <input
          id={`${assortment._id}-sequence`}
          type="number"
          className="w-24 shadow-xs focus:ring-indigo-500 dark:bg-slate-800 dark:border-slate-700 focus:border-indigo-500 block text-sm  border-slate-300 rounded-full mr-2 font-bold text-indigo-500"
          defaultValue={assortment?.sequence}
          onBlur={updateAssortmentSequence}
        />
      </Table.Cell>
    </Table.Row>
  );
};

export default AssortmentListItem;
