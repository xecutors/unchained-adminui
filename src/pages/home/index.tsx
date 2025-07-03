import React from 'react';
import { useIntl } from 'react-intl';
import PageHeader from '../../modules/common/components/PageHeader';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import ShopSetupChecklist from '../../components/copilot/ShopSetupChecklist';

const HomePage = () => {
  const { formatMessage } = useIntl();

  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'home',
          defaultMessage: 'Home',
        })}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <ShopSetupChecklist className="mb-8" />
        
        {/* Additional dashboard content can be added here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {/* Quick Stats */}
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
              {formatMessage({
                id: 'quick_stats',
                defaultMessage: 'Quick Stats',
              })}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {formatMessage({
                id: 'coming_soon',
                defaultMessage: 'Coming soon...',
              })}
            </p>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
              {formatMessage({
                id: 'recent_activity',
                defaultMessage: 'Recent Activity',
              })}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {formatMessage({
                id: 'coming_soon',
                defaultMessage: 'Coming soon...',
              })}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
              {formatMessage({
                id: 'quick_actions',
                defaultMessage: 'Quick Actions',
              })}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {formatMessage({
                id: 'coming_soon',
                defaultMessage: 'Coming soon...',
              })}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;