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
    <div className="flex flex-auto flex-col bg-white shadow sm:rounded-lg">
      <h2 className="px-4 py-5 text-lg font-medium text-gray-900 sm:px-6">
        {formatMessage({
          id: 'discount_information',
          defaultMessage: 'Discounts Information',
        })}
      </h2>
      {discounts?.length ? (
        <Table className="min-w-full ">
          {(discounts || [])?.map((discount) => (
            <Table.Row key={discount._id} header>
              <Table.Cell className="text-left text-xs font-medium  uppercase tracking-wider text-gray-500">
                {formatMessage({
                  id: 'code',
                  defaultMessage: 'Code',
                })}
              </Table.Cell>

              <Table.Cell className="text-left text-xs font-medium  uppercase tracking-wider text-gray-500">
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
                <Table.Cell className="whitespace-nowrap px-6 ">
                  <div className="flex items-center pl-2 text-sm text-gray-900">
                    {discount.code ? discount.code : 'n/a'}
                    <span className="mr-2 inline-block rounded-full py-1 text-xs font-semibold leading-5">
                      <Badge
                        text={discount.trigger}
                        color={triggerColor[discount.trigger]}
                        square
                      />
                    </span>
                  </div>
                </Table.Cell>

                <Table.Cell className="whitespace-nowrap  px-6 ">
                  <div className="flex items-center pl-2 text-sm text-gray-900">
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
          className="border-t border-gray-200 px-4 py-5 sm:px-6"
          icon={EmojiSadIcon}
        />
      )}
    </div>
  );
};

export default LogList;
