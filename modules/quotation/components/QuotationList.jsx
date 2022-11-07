import { useIntl } from 'react-intl';
import Table from '../../common/components/Table';
import QuotationListItem from './QuotationListItem';

const QuotationList = ({ quotations }) => {
  const { formatMessage } = useIntl();

  return (
    <Table className="min-w-full ">
      {quotations?.map((quotation) => (
        <Table.Row key={quotation._id} header>
          <Table.Cell name="quotationNumber">
            {formatMessage({
              id: 'quotation_number',
              defaultMessage: 'Quotation number',
            })}
          </Table.Cell>

          <Table.Cell name="created">
            {formatMessage({
              id: 'created',
              defaultMessage: 'Created',
            })}
          </Table.Cell>

          <Table.Cell name="expires">
            {formatMessage({
              id: 'expires',
              defaultMessage: 'Expires',
            })}
          </Table.Cell>

          <Table.Cell>
            {formatMessage({
              id: 'user',
              defaultMessage: 'User',
            })}
          </Table.Cell>

          <Table.Cell>
            {formatMessage({
              id: 'product',
              defaultMessage: 'Product',
            })}
          </Table.Cell>

          <Table.Cell name="status">
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
