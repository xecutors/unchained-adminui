import { useIntl } from 'react-intl';
import Table from '../../common/components/Table';
import AssortmentListItem from './AssortmentListItem';

const AssortmentList = ({ assortments, showAvatar = true }) => {
  const { formatMessage } = useIntl();
  return (
    <Table className="min-w-full">
      {assortments?.map((assortment) => (
        <Table.Row key={assortment._id} header>
          <Table.Cell>
            {formatMessage({
              id: 'name',
              defaultMessage: 'Name',
            })}
          </Table.Cell>

          <Table.Cell>
            {formatMessage({
              id: 'active',
              defaultMessage: 'Active',
            })}
          </Table.Cell>

          <Table.Cell>
            {formatMessage({
              id: 'root',
              defaultMessage: 'Root',
            })}
          </Table.Cell>

          <Table.Cell>
            {formatMessage({
              id: 'base',
              defaultMessage: 'Base',
            })}
          </Table.Cell>
          <Table.Cell>
            {formatMessage({
              id: 'sequence',
              defaultMessage: 'Sequence',
            })}
          </Table.Cell>
        </Table.Row>
      ))}
      {assortments?.map((assortment) => (
        <AssortmentListItem
          showAvatar={showAvatar}
          key={`${assortment?._id}-body`}
          assortment={assortment}
        />
      ))}
    </Table>
  );
};

export default AssortmentList;
