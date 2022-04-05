import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';

import { PlusIcon } from '@heroicons/react/outline';
import Link from 'next/link';

import { DefaultLimit } from '../modules/common/data/miscellaneous';
import OrderList from '../modules/order/components/OrderList';
import useOrders from '../modules/order/hooks/useOrders';
import Loading from '../modules/common/components/Loading';
import SyncReportList from '../modules/sync/components/SyncReportList';
import useDailySyncs from '../modules/sync/hooks/useDailySyncs';
import useCurrentRoles from '../modules/accounts/hooks/useCurrentRoles';
import ACTION_ROLES from '../modules/common/data/roles';
import ShopInformation from '../modules/common/components/SystemInformations';

const Home = () => {
  const { dailySync } = useDailySyncs({});
  const { hasRole } = useCurrentRoles();
  const { formatMessage } = useIntl();
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
      <div className="xl:grid xl:grid-cols-3 gap-10 md:mt-10 xl:mt-20">
        <div className="xl:col-span-2 overflow-x-auto">
          <h2 className="ml-4 text-xl text-slate-700">
            {formatMessage({ id: 'orders', defaultMessage: 'Orders' })}{' '}
          </h2>
          {loading ? <Loading /> : <OrderList orders={orders} showUser />}
        </div>

        <div className="xl:col-span-1">
          <div className="mb-10">
            <h2 className="ml-4 mb-3 text-xl text-slate-700">
              {formatMessage({ id: 'shortcuts', defaultMessage: 'Shortcuts' })}
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {hasRole(ACTION_ROLES.products.create) && (
                <Link href="/products/new">
                  <a
                    type="button"
                    className="relative inline-flex items-center rounded border border-transparent bg-indigo-500 px-3 py-3 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                  >
                    <PlusIcon
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    />
                    <span className="ml-2">
                      {formatMessage({
                        id: 'product',
                        defaultMessage: 'Product',
                      })}
                    </span>
                  </a>
                </Link>
              )}

              <Link href="/users/new">
                <a
                  type="button"
                  className="relative inline-flex items-center rounded border border-transparent bg-indigo-500 px-3 py-3 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                >
                  <PlusIcon
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  />
                  <span className="ml-2">
                    {formatMessage({
                      id: 'user',
                      defaultMessage: 'User',
                    })}
                  </span>
                </a>
              </Link>

              {hasRole(ACTION_ROLES.assortments.create) && (
                <Link href="/assortments/new">
                  <a
                    type="button"
                    className="relative inline-flex items-center rounded border border-transparent bg-indigo-500 px-3 py-3 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                  >
                    <PlusIcon
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    />
                    <span className="ml-2">
                      {formatMessage({
                        id: 'assortment',
                        defaultMessage: 'Assortment',
                      })}
                    </span>
                  </a>
                </Link>
              )}
            </div>
          </div>
          <div className="mb-10">
            <h2 className="ml-4 mb-3 text-xl text-slate-700">
              {formatMessage({
                id: 'daily_sync',
                defaultMessage: 'Daily sync',
              })}{' '}
            </h2>
            {loading ? <Loading /> : <SyncReportList data={dailySync} />}
          </div>
          {hasRole(ACTION_ROLES.shopInfo.view) && <ShopInformation />}
        </div>
      </div>
    </>
  );
};

export default Home;
