import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

const BASIC_SHOP_STATUS_QUERY = gql`
  query BasicShopStatus {
    countriesCount
    currenciesCount
    languagesCount
    productsCount
    assortmentsCount
    filtersCount
    deliveryProvidersCount
    paymentProvidersCount
    warehousingProvidersCount
  }
`;

export interface Step {
  id: string;
  title: string;
  description: string;
  isComplete: boolean;
  isRequired: boolean;
  setupUrl: string;
  category: 'essential' | 'commerce' | 'content';
  estimatedTime: string;
  icon: string;
  completedAt?: string;
}
export interface ConfigurationStep {
  [key: string]: Step;
}

export interface ShopConfiguration {
  steps: ConfigurationStep;
  overallProgress: number;
  isFullyConfigured: boolean;
  essentialStepsComplete: boolean;
  commerceStepsComplete: boolean;
  contentStepsComplete: boolean;
  lastUpdated: string;
  essentialSteps: { [key: string]: Step };
  commerceSteps: { [key: string]: Step };
  completedRequiredSteps: { [key: string]: Step };
  requiredSteps: { [key: string]: Step };
  contentSteps: { [key: string]: Step };
}

const filterStepsByCategory = (
  steps: ConfigurationStep,
  category: Step['category'],
) => Object.entries(steps).filter(([, step]) => step.category === category);

const initializeConfig = (): ShopConfiguration => {
  const DEFAULT_STEPS: ConfigurationStep = {
    countries: {
      id: 'countries',
      title: 'Countries',
      description: 'Configure at least one country for your shop',
      isRequired: true,
      setupUrl: '/country',
      category: 'essential',
      estimatedTime: '2 min',
      icon: 'globe',
      isComplete: false,
    },
    currencies: {
      id: 'currencies',
      title: 'Currencies',
      description: 'Set up currencies for pricing and payments',
      isRequired: true,
      setupUrl: '/currency',
      category: 'essential',
      estimatedTime: '2 min',
      icon: 'currency',
      isComplete: false,
    },
    languages: {
      id: 'languages',
      title: 'Languages',
      description: 'Configure languages for content localization',
      isRequired: true,
      setupUrl: '/language',
      category: 'essential',
      estimatedTime: '2 min',
      icon: 'language',
      isComplete: false,
    },
    paymentProviders: {
      id: 'payment',
      title: 'Payment Processing',
      description: 'Invoice payment provider is already configured',
      isRequired: true,
      setupUrl: '/payment-provider',
      category: 'commerce',
      estimatedTime: '10 min',
      icon: 'credit-card',
      isComplete: false,
    },
    deliveryProviders: {
      id: 'delivery',
      title: 'Shipping & Delivery',
      description: 'Delivery methods are already configured',
      isRequired: true,
      setupUrl: '/delivery-provider',
      category: 'commerce',
      estimatedTime: '10 min',
      icon: 'truck',
      isComplete: false,
    },

    warehousingProviders: {
      id: 'warehousing',
      title: 'Warehousing',
      description: 'Warehousing providers are already configured',
      isRequired: true,
      setupUrl: '/warehousing-provider',
      category: 'commerce',
      estimatedTime: '10 min',
      icon: 'warehouse',
      isComplete: false,
    },
    products: {
      id: 'products',
      title: 'Products',
      description: 'Create your first products',
      isRequired: true,
      setupUrl: '/products/new',
      category: 'content',
      estimatedTime: '5 min',
      icon: 'cube',
      isComplete: false,
    },
    assortments: {
      id: 'assortments',
      title: 'Categories',
      description: 'Organize products into categories',
      isRequired: false,
      setupUrl: '/assortments/new',
      category: 'content',
      estimatedTime: '3 min',
      icon: 'folder',
      isComplete: false,
    },
  };
  return calculateConfiguration(DEFAULT_STEPS);
};

export const calculateConfiguration = (
  steps: ConfigurationStep,
): ShopConfiguration => {
  const completedSteps = Object.entries(steps).filter(
    ([_, val]) => val.isComplete,
  );
  const requiredSteps = Object.entries(steps).filter(
    ([_, val]) => val.isRequired,
  );
  const completedRequiredSteps = requiredSteps.filter(
    ([_, val]) => val.isComplete,
  );

  const essentialSteps = filterStepsByCategory(steps, 'essential');
  const commerceSteps = filterStepsByCategory(steps, 'commerce');
  const contentSteps = filterStepsByCategory(steps, 'content');

  const essentialStepsComplete = essentialSteps.every(
    ([_, val]) => val.isComplete,
  );
  const commerceStepsComplete = commerceSteps
    .filter(([_, val]) => val.isRequired)
    .every(([_, val]) => val.isComplete);
  const contentStepsComplete = contentSteps.every(([_, val]) => val.isComplete);

  const overallProgress =
    Object.keys(steps).length > 0
      ? Math.round((completedSteps.length / Object.keys(steps).length) * 100)
      : 0;

  const isFullyConfigured =
    completedRequiredSteps.length === requiredSteps.length;
  const config = {
    steps,
    overallProgress,
    isFullyConfigured,
    essentialStepsComplete,
    commerceStepsComplete,
    contentStepsComplete,
    essentialSteps: Object.fromEntries(essentialSteps),
    commerceSteps: Object.fromEntries(commerceSteps),
    completedRequiredSteps: Object.fromEntries(completedRequiredSteps),
    requiredSteps: Object.fromEntries(requiredSteps),
    contentSteps: Object.fromEntries(contentSteps),
    lastUpdated: new Date().toISOString(),
  };
  return config;
};

const STEP_KEYS = [
  'countries',
  'currencies',
  'languages',
  'products',
  'assortments',
  'deliveryProviders',
  'paymentProviders',
  'warehousingProviders',
];

const useShopConfiguration = () => {
  const [configuration, setConfiguration] = useState<ShopConfiguration>(() =>
    initializeConfig(),
  );

  const { data, loading, error } = useQuery(BASIC_SHOP_STATUS_QUERY, {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'ignore',
  });

  useEffect(() => {
    if (!data || loading) return;

    const updatedSteps = { ...(configuration?.steps || {}) };

    for (const key of STEP_KEYS) {
      updatedSteps[key] = {
        ...updatedSteps[key],
        isComplete: Boolean(data?.[`${key}Count`] > 0),
      };
    }

    setConfiguration(calculateConfiguration(updatedSteps));
  }, [data, loading]);

  return {
    configuration,
    loading,
    error,
  };
};

export default useShopConfiguration;
