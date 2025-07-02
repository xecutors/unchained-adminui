import { useState, useEffect, useCallback } from 'react';
import { useQuery, gql } from '@apollo/client';
import {
  getShopConfiguration,
  markStepComplete,
  markStepIncomplete,
  type ShopConfiguration,
} from '../utils/shopConfigTracker';

// GraphQL query to check shop configuration status
const SHOP_CONFIGURATION_STATUS_QUERY = gql`
  query ShopConfigurationStatus {
    # Count queries for existence checks
    countriesCount
    currenciesCount
    languagesCount
    productsCount
    assortmentsCount
    filtersCount
    paymentProvidersCount
    deliveryProvidersCount
    warehousingProvidersCount

    # Get active providers to check if they're properly configured
    paymentProviders {
      _id
      isActive
      configurationError
    }
    deliveryProviders {
      _id
      isActive
      configurationError
    }
    warehousingProviders {
      _id
      isActive
      configurationError
    }
  }
`;

const useShopConfigurationWithValidation = () => {
  const [configuration, setConfiguration] = useState<ShopConfiguration>(() =>
    getShopConfiguration(),
  );
  const [isValidating, setIsValidating] = useState(false);

  // GraphQL query to get actual shop data
  const {
    data: shopData,
    loading: graphqlLoading,
    error: graphqlError,
    refetch: refetchGraphQL,
  } = useQuery(SHOP_CONFIGURATION_STATUS_QUERY, {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
    skip: true, // Skip GraphQL for now to avoid 404 errors
  });

  // Validate configuration against GraphQL data
  const validateConfiguration = useCallback(() => {
    if (!shopData) return;

    setIsValidating(true);

    try {
      const validationResults = {
        // Essential setup - count based validation
        countries: (shopData.countriesCount || 0) > 0,
        currencies: (shopData.currenciesCount || 0) > 0,
        languages: (shopData.languagesCount || 0) > 0,

        // Commerce setup - check for active providers without configuration errors
        payment:
          shopData.paymentProviders?.some(
            (p: any) => p.isActive && !p.configurationError,
          ) || false,
        delivery:
          shopData.deliveryProviders?.some(
            (p: any) => p.isActive && !p.configurationError,
          ) || false,
        warehousing:
          shopData.warehousingProviders?.some(
            (p: any) => p.isActive && !p.configurationError,
          ) || false,

        // Content setup - count based validation
        products: (shopData.productsCount || 0) > 0,
        assortments: (shopData.assortmentsCount || 0) > 0,
        filters: (shopData.filtersCount || 0) > 0,
      };

      // Get current localStorage configuration
      const currentConfig = getShopConfiguration();
      let hasChanges = false;

      // Update localStorage based on GraphQL validation
      for (const [stepId, isValidated] of Object.entries(validationResults)) {
        const currentStep = currentConfig.steps.find(
          (step) => step.id === stepId,
        );

        if (currentStep) {
          // If GraphQL shows it's complete but localStorage doesn't, mark as complete
          if (isValidated && !currentStep.isComplete) {
            markStepComplete(stepId);
            hasChanges = true;
          }
          // If GraphQL shows it's incomplete but localStorage shows complete,
          // keep localStorage state (manual overrides are preserved)
        }
      }

      // Refresh configuration if there were changes
      if (hasChanges) {
        const updatedConfig = getShopConfiguration();
        setConfiguration(updatedConfig);
      }
    } catch (error) {
      console.warn('Error validating shop configuration:', error);
    } finally {
      setIsValidating(false);
    }
  }, [shopData]);

  // Validate configuration when GraphQL data changes
  useEffect(() => {
    if (shopData && !graphqlLoading) {
      validateConfiguration();
    }
  }, [shopData, graphqlLoading, validateConfiguration]);

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

  // Refresh both GraphQL data and localStorage
  const refetch = async () => {
    try {
      await refetchGraphQL();
      const newConfig = getShopConfiguration();
      setConfiguration(newConfig);
    } catch (error) {
      console.warn('Error refetching shop configuration:', error);
    }
  };

  return {
    configuration,
    loading: graphqlLoading || isValidating,
    error: graphqlError,
    refetch,
    shopData, // Expose raw GraphQL data for debugging
  };
};

export default useShopConfigurationWithValidation;
