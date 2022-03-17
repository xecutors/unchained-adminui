import { useIntl } from 'react-intl';
import { EmojiSadIcon } from '@heroicons/react/solid';
import { Fragment } from 'react';

import Table from '../../common/components/Table';
import Badge from '../../common/components/Badge';
import { useFormatPrice } from '../../common/utils/utils';
import NoData from '../../common/components/NoData';

const triggerColor = {
  SYSTEM: 'teal',
  USER: 'indigo',
};

const LogList = ({ discounts }) => {
  const { formatMessage } = useIntl();
  const { formatPrice } = useFormatPrice();

  return (
    <div className="bg-white shadow sm:rounded-lg flex-auto flex flex-col">
      <h2 className="px-4 py-5 sm:px-6 text-lg font-medium text-gray-900">
        {formatMessage({
          id: 'discount_information',
          defaultMessage: 'Discounts Information',
        })}
      </h2>
      {discounts?.length ? (
        <Table className="min-w-full ">
          {(discounts || [])?.map((discount) => (
            <Table.Row key={discount._id} className="bg-white" header>
              <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
                {formatMessage({
                  id: 'code',
                  defaultMessage: 'Code',
                })}
              </Table.Cell>

              <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
                {formatMessage({
                  id: 'discount_amount',
                  defaultMessage: 'Discount Amount',
                })}
              </Table.Cell>
            </Table.Row>
          ))}
          {(discounts || [])?.map((discount) => (
            <Fragment key={discount._id}>
              <Table.Row>
                <Table.Cell className="px-6 whitespace-nowrap ">
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
                      ? formatPrice(discount.total)
                      : 'N/A'}
                  </div>
                </Table.Cell>
              </Table.Row>
            </Fragment>
          ))}
        </Table>
      ) : (
        <NoData
          message={formatMessage({
            id: 'discounts',
            defaultMessage: 'Discounts',
          })}
          className="px-4 py-5 sm:px-6 border-t border-gray-200"
          icon={EmojiSadIcon}
        />
      )}
    </div>
  );
};

export default LogList;
