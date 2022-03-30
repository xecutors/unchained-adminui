import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';

import Badge from '../modules/common/components/Badge';
import { DefaultLimit } from '../modules/common/data/miscellaneous';
import OrderList from '../modules/order/components/OrderList';
import useOrders from '../modules/order/hooks/useOrders';
import Loading from '../modules/common/components/Loading';
import SyncReportList from '../modules/sync/components/SyncReportList';
import useDailySyncs from '../modules/sync/hooks/useDailySyncs';

const Home = ({ shopInfo }) => {
  const { dailySync } = useDailySyncs({});
  const { formatMessage, locale } = useIntl();
  const { query } = useRouter();

  const [queryString] = useState('');

  const limit = parseInt(query?.limit, 10) || DefaultLimit;
  const offset = parseInt(query?.skip, 10) || 0;
  const includeCarts = query?.includeCarts === 'true';

  const { orders, loading } = useOrders({
    limit,
    includeCarts,
    queryString,
    offset,
  });
  return (
    <>
      <div className="grid grid-cols-3 gap-10 md:mt-10 xl:mt-20">
        <div className="col-span-2">
          <h2 className="ml-4 text-xl text-gray-700">Orders</h2>
          {loading ? <Loading /> : <OrderList orders={orders} showUser />}
        </div>

        <div className="col-span-1">
          <div className="mb-10">
            <h2 className="ml-4 text-xl text-gray-700 mb-3">Daily Sync</h2>
            {loading ? <Loading /> : <SyncReportList data={dailySync} />}
          </div>
          <h2 className="ml-4 text-xl text-gray-700">
            {formatMessage({
              id: 'system_information',
              defaultMessage: 'System Information',
            })}
          </h2>

          <div className="mt-2 text-right">
            <div className="bg-white p-4 shadow sm:rounded-lg sm:px-4">
              <ul className="-my-5 divide-y divide-gray-200">
                <li className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {formatMessage({
                        id: 'engine_version',
                        defaultMessage: 'Engine version',
                      })}
                    </div>
                    <div className="min-w-0 flex-1">
                      <Badge text={shopInfo?.version} color="indigo" square />
                    </div>
                  </div>
                </li>
                <li className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {formatMessage({
                        id: 'resolved_language',
                        defaultMessage: 'Resolved language',
                      })}
                    </div>
                    <div className="min-w-0 flex-1">
                      {(shopInfo?.language?.isoCode &&
                        new Intl.DisplayNames([locale], {
                          type: 'language',
                        }).of(shopInfo?.language?.isoCode)) ||
                        shopInfo?.language?.name}{' '}
                      ({shopInfo?.language?.isoCode})
                    </div>
                  </div>
                </li>
                <li className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {formatMessage({
                        id: 'resolved_country',
                        defaultMessage: 'Resolved country',
                      })}
                    </div>
                    <div className="min-w-0 flex-1">
                      {shopInfo?.country?.flagEmoji}
                      {(shopInfo?.country?.isoCode &&
                        new Intl.DisplayNames([locale], { type: 'region' }).of(
                          shopInfo?.country?.isoCode,
                        )) ||
                        shopInfo?.country?.name}{' '}
                      ({shopInfo?.country?.isoCode})
                    </div>
                  </div>
                </li>
                <li className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {formatMessage({
                        id: 'default_currency',
                        defaultMessage: 'Default currency',
                      })}
                    </div>
                    <div className="min-w-0 flex-1">
                      {(shopInfo?.country?.defaultCurrency?.isoCode &&
                        new Intl.DisplayNames([locale], {
                          type: 'currency',
                        }).of(shopInfo?.country?.defaultCurrency?.isoCode)) ||
                        shopInfo?.country?.defaultCurrency?.name}{' '}
                      ({shopInfo?.country?.defaultCurrency?.isoCode})
                    </div>
                  </div>
                </li>
                <li className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {formatMessage({
                        id: 'your_roles',
                        defaultMessage: 'Your roles',
                      })}
                    </div>
                    <div className="min-w-0 flex-1">
                      {shopInfo?.userRoles?.map((role) => (
                        <Badge key={role} text={role} color="green" />
                      ))}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="" />
        <div className="" />
        <div className="" />
      </div>
    </>
  );
};

export default Home;
