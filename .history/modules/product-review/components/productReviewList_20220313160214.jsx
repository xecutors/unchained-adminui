import { useIntl } from 'react-intl';
import Table from '../../common/components/Table';
import QuotationListItem from '.';

const QuotationList = ({ quotations }) => {
  const { formatMessage } = useIntl();
  return (
    <Table className="min-w-full ">
      {quotations?.map((quotation) => (
        <Table.Row key={quotation._id} className="bg-white " header>
          <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
            {formatMessage({
              id: 'quotation_number',
              defaultMessage: 'Quotation number',
            })}
          </Table.Cell>

          <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
            {formatMessage({
              id: 'created',
              defaultMessage: 'Created',
            })}
          </Table.Cell>

          <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
            {formatMessage({
              id: 'expires',
              defaultMessage: 'Expires',
            })}
          </Table.Cell>

          <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
            {formatMessage({
              id: 'user',
              defaultMessage: 'User',
            })}
          </Table.Cell>

          <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
            {formatMessage({
              id: 'product',
              defaultMessage: 'Product',
            })}
          </Table.Cell>

          <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
            {formatMessage({
              id: 'status',
              defaultMessage: 'Status',
            })}
          </Table.Cell>
        </Table.Row>
      ))}

      {quotations?.map((quotation) => (
        <QuotationListItem
          key={`${quotation?._id}-body`}
          quotation={quotation}
        />
      ))}
    </Table>
  );
};

export default QuotationList;
