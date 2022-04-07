import { useIntl } from 'react-intl';

import { PlusIcon } from '@heroicons/react/outline';
import Link from 'next/link';

import ACTION_ROLES from '../modules/common/data/roles';
import ShopInformation from '../modules/common/components/SystemInformation';
import LatestOrders from '../modules/order/components/LatestOrders';
import SyncSummary from '../modules/sync/components/SyncSummary';
import useAuth from '../modules/Auth/useAuth';

const Home = () => {
  const { hasRole } = useAuth();
  const { formatMessage } = useIntl();

  return (
    <>
      <div className="xl:grid xl:grid-cols-3 gap-10 md:mt-10 xl:mt-20 text-slate-700 dark:text-white">
        <div className="xl:col-span-2 overflow-x-auto">
          {hasRole(ACTION_ROLES.orders.viewList) && (
            <h2 className="ml-4 text-xl">
              {formatMessage({ id: 'orders', defaultMessage: 'Orders' })}{' '}
            </h2>
          )}
          {hasRole(ACTION_ROLES.orders.viewList) && <LatestOrders />}
        </div>

        <div className="xl:col-span-1">
          {hasRole(ACTION_ROLES.products.create) ||
            hasRole(ACTION_ROLES.users.create) ||
            (hasRole(ACTION_ROLES.assortments.create) && (
              <div className="mb-10">
                <h2 className="ml-4 mb-3 text-xl text-slate-700">
                  {formatMessage({
                    id: 'shortcuts',
                    defaultMessage: 'Shortcuts',
                  })}
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
                  {hasRole(ACTION_ROLES.products.create) && (
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
                  )}
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
            ))}
          {hasRole(ACTION_ROLES.work.viewList) && (
            <div className="mb-10">
              <h2 className="ml-4 mb-3 text-xl text-slate-700">
                {formatMessage({
                  id: 'daily_sync',
                  defaultMessage: 'Daily sync',
                })}{' '}
              </h2>
              <SyncSummary />
            </div>
          )}
          <ShopInformation />
        </div>
      </div>
    </>
  );
};

export default Home;
