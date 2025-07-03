import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import useShopConfiguration from '../../modules/common/hooks/useShopConfiguration';
import { ConfigurationStep } from '../../modules/common/utils/shopConfigTracker';
import ProgressIndicator from './ProgressIndicator';
import SetupStepCard from './SetupStepCard';

interface ShopSetupChecklistProps {
  onDismiss?: () => void;
  className?: string;
}

const ShopSetupChecklist: React.FC<ShopSetupChecklistProps> = ({
  onDismiss,
  className,
}) => {
  const { formatMessage } = useIntl();
  const { configuration, loading, error, refetch } = useShopConfiguration();
  const [expandedSections, setExpandedSections] = useState({
    essential: false,
    commerce: false,
    content: false,
  });
  const [isDismissed, setIsDismissed] = useState(false);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    if (onDismiss) {
      onDismiss();
    }
  };

  const handleStepClick = (step: ConfigurationStep) => {
    // Could add analytics or other tracking here
    console.log('Setup step clicked:', step.id);
  };

  if (loading) {
    return (
      <div
        className={classNames(
          'p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700',
          className,
        )}
      >
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-16 bg-slate-100 dark:bg-slate-700 rounded"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || isDismissed) {
    return null;
  }

  // Don't show if shop is fully configured
  if (configuration.isFullyConfigured) {
    return (
      <div
        className={classNames(
          'p-6 bg-gradient-to-r from-emerald-50 to-emerald-50 dark:from-emerald-900/20 dark:to-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-700/50',
          className,
        )}
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <CheckCircleIcon className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-200 mb-2">
              {formatMessage({
                id: 'shop_setup_complete',
                defaultMessage: 'Shop Setup Complete!',
              })}
            </h3>
            <p className="text-emerald-700 dark:text-emerald-300 text-sm">
              {formatMessage({
                id: 'shop_setup_complete_description',
                defaultMessage:
                  'Congratulations! Your shop is fully configured and ready to accept orders.',
              })}
            </p>
          </div>
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-1 text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-200"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  const essentialSteps = configuration.steps.filter(
    (step) => step.category === 'essential',
  );
  const commerceSteps = configuration.steps.filter(
    (step) => step.category === 'commerce',
  );
  const contentSteps = configuration.steps.filter(
    (step) => step.category === 'content',
  );

  const getCategoryProgress = (steps: ConfigurationStep[]) => {
    if (steps.length === 0) return 100;
    const completed = steps.filter((step) => step.isComplete).length;
    return Math.round((completed / steps.length) * 100);
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'essential':
        return formatMessage({
          id: 'essential_setup',
          defaultMessage: 'Essential Setup',
        });
      case 'commerce':
        return formatMessage({
          id: 'commerce_setup',
          defaultMessage: 'Commerce Setup',
        });
      case 'content':
        return formatMessage({
          id: 'content_setup',
          defaultMessage: 'Content Setup',
        });
      default:
        return category;
    }
  };

  const getCategoryDescription = (category: string) => {
    switch (category) {
      case 'essential':
        return formatMessage({
          id: 'essential_setup_description',
          defaultMessage: 'Core settings required for your shop to function',
        });
      case 'commerce':
        return formatMessage({
          id: 'commerce_setup_description',
          defaultMessage: 'Payment and delivery configuration for transactions',
        });
      case 'content':
        return formatMessage({
          id: 'content_setup_description',
          defaultMessage: 'Products and categories to start selling',
        });
      default:
        return '';
    }
  };

  const renderSection = (
    category: keyof typeof expandedSections,
    steps: ConfigurationStep[],
  ) => {
    const isExpanded = expandedSections[category];
    const progress = getCategoryProgress(steps);
    const requiredSteps = steps.filter((step) => step.isRequired);
    const hasIncompleteRequired = requiredSteps.some(
      (step) => !step.isComplete,
    );

    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection(category)}
          className="w-full p-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {getCategoryTitle(category)}
                  {hasIncompleteRequired && (
                    <span className="text-rose-500 ml-1">*</span>
                  )}
                </h3>
                <ProgressIndicator
                  progress={progress}
                  size="sm"
                  className="w-24"
                />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                {getCategoryDescription(category)}
              </p>
            </div>
            {isExpanded ? (
              <ChevronUpIcon className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDownIcon className="w-5 h-5 text-slate-400" />
            )}
          </div>
        </button>

        {isExpanded && (
          <div className="p-4 space-y-3 bg-white dark:bg-slate-800">
            {steps.map((step) => (
              <SetupStepCard
                key={step.id}
                step={step}
                onStepClick={handleStepClick}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={classNames(
        'bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden',
        className,
      )}
    >
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 border-b border-slate-200 dark:border-slate-600">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-800 dark:from-slate-500 dark:to-slate-700 rounded-xl flex items-center justify-center">
              <RocketLaunchIcon className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
              {formatMessage({
                id: 'complete_shop_setup',
                defaultMessage: 'Complete Your Shop Setup',
              })}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              {formatMessage({
                id: 'shop_setup_description',
                defaultMessage:
                  'Follow these steps to configure your shop and start selling.',
              })}
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">
                  {formatMessage({
                    id: 'overall_progress',
                    defaultMessage: 'Overall Progress',
                  })}
                </span>
                <span className="font-medium text-slate-900 dark:text-slate-100">
                  {configuration.steps.filter((s) => s.isComplete).length} of{' '}
                  {configuration.steps.length} complete
                </span>
              </div>
              <ProgressIndicator
                progress={configuration.overallProgress}
                size="md"
              />
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {renderSection('essential', essentialSteps)}
        {renderSection('commerce', commerceSteps)}
        {renderSection('content', contentSteps)}

        {/* Footer note */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-500 dark:text-slate-500 flex items-center gap-1">
            <span className="inline-block w-2 h-2 bg-rose-500 rounded-full"></span>
            {formatMessage({
              id: 'required_steps_note',
              defaultMessage: 'Required for basic shop functionality',
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShopSetupChecklist;
