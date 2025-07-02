/**
 * Client-side shop configuration tracker for static export compatibility
 * Uses localStorage to track setup progress without backend dependency
 */

export interface ConfigurationStep {
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

export interface ShopConfiguration {
  steps: ConfigurationStep[];
  overallProgress: number;
  isFullyConfigured: boolean;
  essentialStepsComplete: boolean;
  commerceStepsComplete: boolean;
  contentStepsComplete: boolean;
  lastUpdated: string;
}

const STORAGE_KEY = 'unchained_shop_config';

// Default configuration steps
const DEFAULT_STEPS: Omit<ConfigurationStep, 'isComplete' | 'completedAt'>[] = [
  // Essential Setup
  {
    id: 'countries',
    title: 'Countries',
    description: 'Configure at least one country for your shop',
    isRequired: true,
    setupUrl: '/country',
    category: 'essential',
    estimatedTime: '2 min',
    icon: 'globe',
  },
  {
    id: 'currencies',
    title: 'Currencies',
    description: 'Set up currencies for pricing and payments',
    isRequired: true,
    setupUrl: '/currency',
    category: 'essential',
    estimatedTime: '2 min',
    icon: 'currency',
  },
  {
    id: 'languages',
    title: 'Languages',
    description: 'Configure languages for content localization',
    isRequired: true,
    setupUrl: '/language',
    category: 'essential',
    estimatedTime: '2 min',
    icon: 'language',
  },
  // Commerce Setup
  {
    id: 'payment',
    title: 'Payment Processing',
    description: 'Set up payment providers to accept payments',
    isRequired: true,
    setupUrl: '/payment-provider',
    category: 'commerce',
    estimatedTime: '10 min',
    icon: 'credit-card',
  },
  {
    id: 'delivery',
    title: 'Shipping & Delivery',
    description: 'Configure delivery methods for order fulfillment',
    isRequired: true,
    setupUrl: '/delivery-provider',
    category: 'commerce',
    estimatedTime: '10 min',
    icon: 'truck',
  },
  {
    id: 'warehousing',
    title: 'Inventory Management',
    description: 'Set up warehousing for stock management',
    isRequired: false,
    setupUrl: '/warehousing-provider',
    category: 'commerce',
    estimatedTime: '5 min',
    icon: 'warehouse',
  },
  // Content Setup
  {
    id: 'products',
    title: 'Product Catalog',
    description: 'Create your first products',
    isRequired: false,
    setupUrl: '/products/new',
    category: 'content',
    estimatedTime: '5 min',
    icon: 'cube',
  },
  {
    id: 'assortments',
    title: 'Categories',
    description: 'Organize products into categories',
    isRequired: false,
    setupUrl: '/assortments/new',
    category: 'content',
    estimatedTime: '3 min',
    icon: 'folder',
  },
  {
    id: 'filters',
    title: 'Product Filters',
    description: 'Create filters to help customers find products',
    isRequired: false,
    setupUrl: '/filters/new',
    category: 'content',
    estimatedTime: '3 min',
    icon: 'funnel',
  },
];

/**
 * Get stored configuration from localStorage
 */
function getStoredConfig(): Partial<ShopConfiguration> | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.warn('Failed to parse stored shop configuration:', error);
    return null;
  }
}

/**
 * Save configuration to localStorage
 */
function saveConfig(config: ShopConfiguration): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (error) {
    console.warn('Failed to save shop configuration:', error);
  }
}

/**
 * Initialize configuration with default steps
 */
function initializeConfig(): ShopConfiguration {
  const steps: ConfigurationStep[] = DEFAULT_STEPS.map((step) => ({
    ...step,
    isComplete: false,
  }));

  return calculateConfiguration(steps);
}

/**
 * Calculate overall configuration metrics
 */
function calculateConfiguration(steps: ConfigurationStep[]): ShopConfiguration {
  const completedSteps = steps.filter((step) => step.isComplete);
  const requiredSteps = steps.filter((step) => step.isRequired);
  const completedRequiredSteps = requiredSteps.filter(
    (step) => step.isComplete,
  );

  const essentialSteps = steps.filter((step) => step.category === 'essential');
  const commerceSteps = steps.filter((step) => step.category === 'commerce');
  const contentSteps = steps.filter((step) => step.category === 'content');

  const essentialStepsComplete = essentialSteps.every(
    (step) => step.isComplete,
  );
  const commerceStepsComplete = commerceSteps
    .filter((step) => step.isRequired)
    .every((step) => step.isComplete);
  const contentStepsComplete = contentSteps.every((step) => step.isComplete);

  const overallProgress =
    steps.length > 0
      ? Math.round((completedSteps.length / steps.length) * 100)
      : 0;

  const isFullyConfigured =
    completedRequiredSteps.length === requiredSteps.length;

  return {
    steps,
    overallProgress,
    isFullyConfigured,
    essentialStepsComplete,
    commerceStepsComplete,
    contentStepsComplete,
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Get current shop configuration
 */
export function getShopConfiguration(): ShopConfiguration {
  const stored = getStoredConfig();

  if (stored && stored.steps) {
    // Merge stored completion status with current step definitions
    const steps: ConfigurationStep[] = DEFAULT_STEPS.map((defaultStep) => {
      const storedStep = stored.steps?.find((s) => s.id === defaultStep.id);
      return {
        ...defaultStep,
        isComplete: storedStep?.isComplete || false,
        completedAt: storedStep?.completedAt,
      };
    });

    return calculateConfiguration(steps);
  }

  return initializeConfig();
}

/**
 * Mark a configuration step as complete
 */
export function markStepComplete(stepId: string): ShopConfiguration {
  const config = getShopConfiguration();
  const stepIndex = config.steps.findIndex((step) => step.id === stepId);

  if (stepIndex !== -1) {
    config.steps[stepIndex] = {
      ...config.steps[stepIndex],
      isComplete: true,
      completedAt: new Date().toISOString(),
    };
  }

  const newConfig = calculateConfiguration(config.steps);
  saveConfig(newConfig);

  // Dispatch custom event for other components to listen
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('shopConfigUpdated', {
        detail: { stepId, config: newConfig },
      }),
    );
  }

  return newConfig;
}

/**
 * Mark a configuration step as incomplete
 */
export function markStepIncomplete(stepId: string): ShopConfiguration {
  const config = getShopConfiguration();
  const stepIndex = config.steps.findIndex((step) => step.id === stepId);

  if (stepIndex !== -1) {
    config.steps[stepIndex] = {
      ...config.steps[stepIndex],
      isComplete: false,
      completedAt: undefined,
    };
  }

  const newConfig = calculateConfiguration(config.steps);
  saveConfig(newConfig);

  // Dispatch custom event
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('shopConfigUpdated', {
        detail: { stepId, config: newConfig },
      }),
    );
  }

  return newConfig;
}

/**
 * Reset all configuration progress
 */
export function resetConfiguration(): ShopConfiguration {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }

  const newConfig = initializeConfig();

  // Dispatch custom event
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('shopConfigUpdated', {
        detail: { config: newConfig },
      }),
    );
  }

  return newConfig;
}

/**
 * Check if we should auto-mark steps based on current route
 */
export function autoMarkStepFromRoute(pathname: string): void {
  const routeToStepMap: Record<string, string> = {
    '/country': 'countries',
    '/currency': 'currencies',
    '/language': 'languages',
    '/payment-provider': 'payment',
    '/delivery-provider': 'delivery',
    '/warehousing-provider': 'warehousing',
    '/products': 'products',
    '/assortments': 'assortments',
    '/filters': 'filters',
  };

  const stepId = routeToStepMap[pathname];
  if (stepId) {
    // Mark as complete after a delay to allow for form submission
    setTimeout(() => {
      markStepComplete(stepId);
    }, 1000);
  }
}
