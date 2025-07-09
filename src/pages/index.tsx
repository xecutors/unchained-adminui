import React from 'react';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import PageHeader from '../modules/common/components/PageHeader';
import ShopSetupChecklist from '../components/copilot/ShopSetupChecklist';
import DashboardMetrics from '../modules/common/components/DashboardMetrics';
import SimpleDashboard from '../modules/common/components/SimpleDashboard';
import useShopInfo from '../modules/common/hooks/useShopInfo';
import useAuth from '../modules/Auth/useAuth';
import Button from '../modules/common/components/Button';
import { WorkQueueWarningBanner } from '../modules/work/components/WorkQueueWarningBanner';

const HomePage = () => {
  const { formatMessage } = useIntl();
  const router = useRouter();
  const { shopInfo } = useShopInfo();
  const { hasRole } = useAuth();

  return (
    <div>
      <WorkQueueWarningBanner />
      <div className="mt-18">
        <PageHeader
          headerText={formatMessage({
            id: 'unchained_admin_ui',
            defaultMessage: 'Unchained AdminUI',
          })}
        />
      </div>
      <div className="mx-auto py-6">
        <ShopSetupChecklist className="mb-8" />
        <SimpleDashboard />
        <DashboardMetrics />
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
                <Button
                  onClick={() => router.push('/products/new')}
                  icon={<PlusIcon className="w-5 h-5" />}
                  variant="primary"
                  size="lg"
                  text={formatMessage({
                    id: 'product',
                    defaultMessage: 'Product',
                  })}
                />
              )}
              {hasRole('createUser') && (
                <Button
                  onClick={() => router.push('/users/new')}
                  icon={<PlusIcon className="w-5 h-5" />}
                  variant="primary"
                  size="lg"
                  text={formatMessage({
                    id: 'user',
                    defaultMessage: 'User',
                  })}
                />
              )}
              {hasRole('createAssortment') && (
                <Button
                  onClick={() => router.push('/assortments/new')}
                  icon={<PlusIcon className="w-5 h-5" />}
                  variant="primary"
                  size="lg"
                  text={formatMessage({
                    id: 'assortment',
                    defaultMessage: 'Assortment',
                  })}
                />
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
    </div>
  );
};

export default HomePage;
