import { useState, useEffect, useCallback } from 'react';
import { useQuery, gql } from '@apollo/client';
import {
  getShopConfiguration,
  markStepComplete,
  type ShopConfiguration,
} from '../utils/shopConfigTracker';

// Simple GraphQL query to check basic shop configuration
const BASIC_SHOP_STATUS_QUERY = gql`
  query BasicShopStatus {
    countriesCount
    currenciesCount
    languagesCount
    productsCount
    assortmentsCount
    filtersCount
  }
`;

const useShopConfiguration = () => {
  const [configuration, setConfiguration] = useState<ShopConfiguration>(() =>
    getShopConfiguration(),
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Try to get basic counts, but don't fail if GraphQL is unavailable
  const {
    data: shopData,
    loading: graphqlLoading,
    error: graphqlError,
  } = useQuery(BASIC_SHOP_STATUS_QUERY, {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'ignore', // Don't fail on GraphQL errors
    skip: false, // Enable GraphQL queries to get real data
  });

  // Update localStorage based on GraphQL data when available
  const validateWithGraphQL = useCallback(() => {
    if (!shopData || graphqlError) return;

    const validationResults = {
      countries: (shopData.countriesCount || 0) > 0,
      currencies: (shopData.currenciesCount || 0) > 0,
      languages: (shopData.languagesCount || 0) > 0,
      products: (shopData.productsCount || 0) > 0,
      assortments: (shopData.assortmentsCount || 0) > 0,
      filters: (shopData.filtersCount || 0) > 0,
    };

    // Auto-mark steps that have data but aren't marked complete
    let hasChanges = false;
    for (const [stepId, hasData] of Object.entries(validationResults)) {
      if (hasData) {
        const currentConfig = getShopConfiguration();
        const step = currentConfig.steps.find((s) => s.id === stepId);
        if (step && !step.isComplete) {
          markStepComplete(stepId);
          hasChanges = true;
        }
      }
    }

    if (hasChanges) {
      setConfiguration(getShopConfiguration());
    }
  }, [shopData, graphqlError]);

  // Run validation when GraphQL data is available
  useEffect(() => {
    if (shopData && !graphqlLoading && !graphqlError) {
      validateWithGraphQL();
    }
  }, [shopData, graphqlLoading, graphqlError, validateWithGraphQL]);

  // Listen for manual configuration updates
  useEffect(() => {
    const handleConfigUpdate = (event: CustomEvent) => {
      setConfiguration(event.detail.config);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener(
        'shopConfigUpdated',
        handleConfigUpdate as EventListener,
      );

      return () => {
        window.removeEventListener(
          'shopConfigUpdated',
          handleConfigUpdate as EventListener,
        );
      };
    }
  }, []);

  // Refresh configuration from localStorage and re-validate
  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const newConfig = getShopConfiguration();
      setConfiguration(newConfig);

      // Trigger GraphQL validation if available
      if (shopData) {
        validateWithGraphQL();
      }
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Failed to load configuration'),
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    configuration,
    loading: loading || graphqlLoading,
    error:
      error || (graphqlError ? new Error('GraphQL validation failed') : null),
    refetch,
  };
};

export default useShopConfiguration;
