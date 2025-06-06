declare global {
  interface Window {
    workbox?: any;
  }
}

import React, { useEffect } from 'react';

import { useIntl } from 'react-intl';
import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import SystemInformation from '../modules/common/components/SystemInformation';
import LatestOrders from '../modules/order/components/LatestOrders';
import useAuth from '../modules/Auth/useAuth';
import LatestProductReviews from '../modules/product-review/components/LatestProductReviews';

const Home = () => {
  const { hasRole } = useAuth();
  const { formatMessage } = useIntl();

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      window?.workbox !== undefined
    ) {
      const wb = window.workbox;

      const promptNewVersionAvailable = () => {
        if (
          confirm(
            formatMessage({
              id: 'app_new_version_available',
              defaultMessage:
                'A newer version of this web app is available, reload to update?',
            }),
          )
        ) {
          wb.addEventListener('controlling', () => {
            window?.location.reload();
          });

          wb.messageSkipWaiting();
        }
      };
      wb.addEventListener('waiting', promptNewVersionAvailable);
      wb.register();
    }
  }, [formatMessage]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8 mt-6 md:mt-10 xl:mt-20 text-slate-700 dark:text-slate-200">
      {/* Orders Section */}
      {hasRole('showOrders') && (
        <div className="overflow-x-auto order-last xl:order-first">
          <h2 className="ml-4 mb-4 text-lg sm:text-xl">
            {formatMessage({ id: 'orders', defaultMessage: 'Orders' })}
          </h2>
          <LatestOrders />
        </div>
      )}

      {/* Shortcuts & System Info */}
      <div className="order-first xl:order-last">
        {(hasRole('addProduct') ||
          hasRole('addUser') ||
          hasRole('addAssortment')) && (
          <div className="mb-6 md:mb-10">
            <h2 className="ml-4 mb-4 text-lg sm:text-xl">
              {formatMessage({ id: 'shortcuts', defaultMessage: 'Shortcuts' })}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {hasRole('addProduct') && (
                <Link
                  href="/products/new"
                  className="relative inline-flex items-center rounded bg-indigo-500 px-3 py-2 sm:py-3 text-sm sm:text-base font-medium text-white shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400"
                >
                  <PlusIcon className="h-4 w-4" />
                  <span className="ml-2">
                    {formatMessage({
                      id: 'product',
                      defaultMessage: 'Product',
                    })}
                  </span>
                </Link>
              )}
              {hasRole('addUser') && (
                <Link
                  href="/users/new"
                  className="relative inline-flex items-center rounded bg-indigo-500 px-3 py-2 sm:py-3 text-sm sm:text-base font-medium text-white shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400"
                >
                  <PlusIcon className="h-4 w-4" />
                  <span className="ml-2">
                    {formatMessage({ id: 'user', defaultMessage: 'User' })}
                  </span>
                </Link>
              )}
              {hasRole('addAssortment') && (
                <Link
                  href="/assortments/new"
                  className="relative inline-flex items-center rounded bg-indigo-500 px-3 py-2 sm:py-3 text-sm sm:text-base font-medium text-white shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400"
                >
                  <PlusIcon className="h-4 w-4" />
                  <span className="ml-2">
                    {formatMessage({
                      id: 'assortment',
                      defaultMessage: 'Assortment',
                    })}
                  </span>
                </Link>
              )}
            </div>
          </div>
        )}
        <div>
          <SystemInformation />
          {hasRole('showProducts') && (
            <>
              <h2 className="ml-4 mb-4 mt-6 text-lg sm:text-xl">
                {formatMessage({
                  id: 'latest-reviews',
                  defaultMessage: 'Latest Reviews',
                })}
              </h2>
              <LatestProductReviews />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
