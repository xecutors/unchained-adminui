import { useIntl } from 'react-intl';
import Table from '../../common/components/Table';
import QuotationListItem from './QuotationListItem';

const QuotationList = ({ quotations }) => {
  const { formatMessage } = useIntl();
  return (
    <Table className="min-w-full ">
      {quotations?.map((quotation) => (
        <Table.Row key={quotation._id} header>
          <Table.Cell className="text-left text-xs font-medium  uppercase tracking-wider text-gray-500">
            {formatMessage({
              id: 'quotation_number',
              defaultMessage: 'Quotation number',
            })}
          </Table.Cell>

          <Table.Cell className="text-left text-xs font-medium  uppercase tracking-wider text-gray-500">
            {formatMessage({
              id: 'created',
              defaultMessage: 'Created',
            })}
          </Table.Cell>

          <Table.Cell className="text-left text-xs font-medium  uppercase tracking-wider text-gray-500">
            {formatMessage({
              id: 'expires',
              defaultMessage: 'Expires',
            })}
          </Table.Cell>

          <Table.Cell className="text-left text-xs font-medium  uppercase tracking-wider text-gray-500">
            {formatMessage({
              id: 'user',
              defaultMessage: 'User',
            })}
          </Table.Cell>

          <Table.Cell className="text-left text-xs font-medium  uppercase tracking-wider text-gray-500">
            {formatMessage({
              id: 'product',
              defaultMessage: 'Product',
            })}
          </Table.Cell>

          <Table.Cell className="text-left text-xs font-medium  uppercase tracking-wider text-gray-500">
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
