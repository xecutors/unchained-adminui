import { useIntl } from 'react-intl';

import Table from '../../common/components/Table';
import Badge from '../../common/components/Badge';
import { getCurrencyAndPrice } from '../../common/utils/utils';

const triggerColor = {
  SYSTEM: 'teal',
  USER: 'indigo',
};

const LogList = ({ discounts }) => {
  const { formatMessage } = useIntl();

  return (
    <section>
      <Table className="min-w-full ">
        {(discounts || [])?.map((discount) => (
          <Table.Row key={discount._id} className="bg-white " header>
            <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
              {formatMessage({
                id: 'code',
                defaultMessage: 'Code',
              })}
            </Table.Cell>

            <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
              {formatMessage({
                id: 'amount',
                defaultMessage: 'Discount Amount',
              })}
            </Table.Cell>
          </Table.Row>
        ))}
        {(discounts || [])?.map((discount) => (
          <Fragment key={discount._id}>
            <Table.Row>
              <Table.Cell className="px-6  whitespace-nowrap ">
                <div className="pl-2 flex items-center text-sm text-gray-900">
                  {discount.code ? discount.code : 'n/a'}
                  <span className="inline-block py-1 text-xs leading-5 font-semibold rounded-full mr-2">
                    <Badge
                      text={discount.trigger}
                      color={triggerColor[discount.trigger]}
                      square
                    />
                  </span>
                </div>
              </Table.Cell>

              <Table.Cell className="px-6  whitespace-nowrap ">
                <div className="pl-2 flex items-center text-sm text-gray-900">
                  {discount.total.amount
                    ? getCurrencyAndPrice(discount.total)
                    : 'n/a'}
                </div>
              </Table.Cell>
            </Table.Row>
          </Fragment>
        ))}
      </Table>
    </section>
  );
};

export default LogList;
