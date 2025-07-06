import React from 'react';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import { PlusIcon } from '@heroicons/react/24/outline';
import PageHeader from '../modules/common/components/PageHeader';
import ShopSetupChecklist from '../components/copilot/ShopSetupChecklist';
import useShopInfo from '../modules/common/hooks/useShopInfo';
import useAuth from '../modules/Auth/useAuth';

const HomePage = () => {
  const { formatMessage } = useIntl();
  const router = useRouter();
  const { shopInfo } = useShopInfo();
  const { hasRole } = useAuth();

  return (
    <>
      <PageHeader
        headerText={formatMessage({
          id: 'home',
          defaultMessage: 'Home',
        })}
      />
      <div className="mx-auto py-6">
        <ShopSetupChecklist className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
              {formatMessage({
                id: 'shortcuts',
                defaultMessage: 'Shortcuts',
              })}
            </h3>
            <div className="grid xl:grid-cols-3 gap-3">
              {hasRole('createProduct') && (
                <button
                  onClick={() => router.push('/products/new')}
                  className="relative flex items-center justify-center px-6 py-3 bg-slate-900 hover:bg-slate-950 text-white rounded-lg transition-colors"
                >
                  <PlusIcon className="w-5 h-5 absolute left-3" />
                  <span>
                    {formatMessage({
                      id: 'product',
                      defaultMessage: 'Product',
                    })}
                  </span>
                </button>
              )}
              {hasRole('createUser') && (
                <button
                  onClick={() => router.push('/users/new')}
                  className="relative flex items-center justify-center px-6 py-3 bg-slate-900 hover:bg-slate-950 text-white rounded-lg transition-colors"
                >
                  <PlusIcon className="w-5 h-5 absolute left-3" />
                  <span>
                    {formatMessage({
                      id: 'user',
                      defaultMessage: 'User',
                    })}
                  </span>
                </button>
              )}
              {hasRole('createAssortment') && (
                <button
                  onClick={() => router.push('/assortments/new')}
                  className="relative flex items-center justify-center px-6 py-3 bg-slate-900 hover:bg-slate-950 text-white rounded-lg transition-colors"
                >
                  <PlusIcon className="w-5 h-5 absolute left-3" />
                  <span>
                    {formatMessage({
                      id: 'assortment',
                      defaultMessage: 'Assortment',
                    })}
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* System Information */}
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
              {formatMessage({
                id: 'system_information',
                defaultMessage: 'System Information',
              })}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {formatMessage({
                    id: 'engine_version',
                    defaultMessage: 'Engine version',
                  })}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400">
                  {shopInfo?.version || 'n/a'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {formatMessage({
                    id: 'resolved_language',
                    defaultMessage: 'Resolved language',
                  })}
                </span>
                <span className="text-sm text-slate-900 dark:text-slate-100">
                  {shopInfo?.language?.name || 'n/a'} (
                  {shopInfo?.language?.isoCode || 'n/a'})
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {formatMessage({
                    id: 'resolved_country',
                    defaultMessage: 'Resolved country',
                  })}
                </span>
                <span className="text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span className="text-base">
                    {shopInfo?.country?.flagEmoji || 'n/a'}
                  </span>
                  {shopInfo?.country?.name || 'n/a'} (
                  {shopInfo?.country?.isoCode || 'n/a'})
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {formatMessage({
                    id: 'default_currency',
                    defaultMessage: 'Default currency',
                  })}
                </span>
                <span className="text-sm text-slate-900 dark:text-slate-100">
                  {shopInfo?.country?.defaultCurrency?.isoCode || 'n/a'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
