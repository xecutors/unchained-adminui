import Link from 'next/link';
import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';
import MediaAvatar from '../../common/components/MediaAvatar';
import Table from '../../common/components/Table';

const AssortmentListItem = ({ assortment, showAvatar }) => {
  const { formatMessage } = useIntl();

  const STATUS = {
    true: formatMessage({ id: 'active', defaultMessage: 'Active' }),
    false: formatMessage({ id: 'in_active', defaultMessage: 'In-Active' }),
  };

  return (
    <Table.Row>
      <Table.Cell className="px-6  whitespace-nowrap ">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          {showAvatar && (
            <MediaAvatar
              file={assortment?.media?.length && assortment.media[0].file}
              className="mr-2"
            />
          )}
          <Link href={`/assortments/${assortment._id}`}>
            <a className="text-blue-600">
              {assortment?.texts?.title || (
                <>
                  {assortment._id}{' '}
                  <Badge
                    color="blue"
                    text={formatMessage({ id: 'name', defaultMessage: 'Name' })}
                  />
                </>
              )}
            </a>
          </Link>
        </div>
      </Table.Cell>

      <Table.Cell className="px-6  whitespace-nowrap">
        <Badge
          text={STATUS[assortment.isActive]}
          color={assortment.isActive ? 'green' : 'red'}
          square
        />
      </Table.Cell>

      <Table.Cell className="px-6  whitespace-nowrap">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          {assortment.isRoot && (
            <Badge
              text={formatMessage({
                id: 'assortment_root',
                defaultMessage: 'Root',
              })}
              color="green"
              square
            />
          )}
        </div>
      </Table.Cell>

      <Table.Cell className="px-6  whitespace-nowrap">
        <div className="pl-2 flex items-center text-sm text-gray-900">
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
    </Table.Row>
  );
};

export default AssortmentListItem;
