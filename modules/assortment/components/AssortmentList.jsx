import { useIntl } from 'react-intl';
import Table from '../../common/components/Table';
import AssortmentListItem from './AssortmentListItem';

const AssortmentList = ({ assortments, showAvatar = true }) => {
  const { formatMessage } = useIntl();
  return (
    <Table className="min-w-full">
      {assortments?.map((assortment) => (
        <Table.Row key={assortment._id} className="bg-white " header>
          <Table.Cell className="text-left text-xs font-medium  uppercase tracking-wider text-gray-500">
            {formatMessage({
              id: 'name',
              defaultMessage: 'Name',
            })}
          </Table.Cell>

          <Table.Cell className="sm:py-1text-gray-500  pr-6 text-left text-xs font-medium uppercase tracking-wider">
            {formatMessage({
              id: 'active',
              defaultMessage: 'Active',
            })}
          </Table.Cell>

          <Table.Cell className=" text-left text-xs font-medium uppercase  tracking-wider text-gray-500">
            {formatMessage({
              id: 'root',
              defaultMessage: 'Root',
            })}
          </Table.Cell>

          <Table.Cell className="sm:py-1text-gray-500  pr-6 text-left text-xs font-medium uppercase tracking-wider">
            {formatMessage({
              id: 'base',
              defaultMessage: 'Base',
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
