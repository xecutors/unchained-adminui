import { useCallback } from 'react';
import { useIntl } from 'react-intl';

export const SingleProductReturnTools = [
  'product_get',
  'product_create',
  'product_update',
  'product_updateCommerce',
  'product_remove',
  'product_publish',
  'product_unpublish',
  'product_updateWarehousing',
  'product_updateSupply',
  'product_updateTokenization',
  'product_updatePlan',
] as const;

export const MultipleProductReturnTools = [
  'product_list',
  'product_variationProducts',
  'assortment_getProducts',
] as const;

export const SingleProductVariationsReturnTools = [
  'product_variations',
  'product_createVariation',
  'product_createVariationOption',
] as const;
export const ProductVariationsReturnTools = [
  'product_variations',
  'product_createVariation',
  'product_createVariationOption',
] as const;
export const ProductAssignmentsReturnTools = ['product_assignments'] as const;
export const ProductBundleReturnTools = [
  'product_bundleItems',
  'product_removeBundleItem',
  'product_addBundleItem',
] as const;

export const TextsReturnTools = [
  'product_updateTexts',
  'productMedia_updateTexts',
  'product_getTexts',
  'productMedia_getTexts',
  'assortmentMedia_updateTexts',
  'assortmentMedia_getTexts',
  'assortment_getTexts',
  'assortment_updateTexts',
  'productVariation_updateTexts',
  'productVariation_getTexts',
] as const;

export const SingleAssortmentReturnTools = [
  'assortment_create',
  'assortment_update',
  'assortment_remove',
  'assortment_setBase',
  'assortment_get',
  'assortment_searchProducts',
] as const;

export const MultipleAssortmentReturnTools = [
  'assortment_getChildren',
  'assortment_list',
] as const;

export const SingleCountryReturnTools = [
  'country_create',
  'country_update',
  'country_remove',
  'country_get',
] as const;

export const MultipleCountryReturnTools = ['country_list'] as const;

export const SingleCurrencyReturnTools = [
  'currency_create',
  'currency_update',
  'currency_remove',
  'currency_get',
] as const;

export const MultipleCurrencyReturnTools = ['currency_list'] as const;

export const SingleLanguageReturnTools = [
  'language_create',
  'language_update',
  'language_remove',
  'language_get',
] as const;

export const MediaListReturnTools = [
  'product_getMedias',
  'assortment_getMedias',
  'product_reorderMedias',
  'assortment_reorderMedias',
  'generateImage',
] as const;

export const OtherTools = ['shop_info', 'generateImage'] as const;

export const MultipleLanguageReturnTools = ['languages_list'] as const;

export const SkippedToolResponse = [
  'assortment_addMedia',
  'assortment_removeMedia',
  'productMedia_remove',
  'product_addMedia',
] as const;

export const PriceReturnTools = [
  'product_simulatedPrice',
  'product_catalogPrice',
  'product_simulatedPriceRange',
] as const;

export const SingleProviderReturnTools = [
  'paymentProvider_add',
  'paymentProvider_update',
  'paymentProvider_get',
  'deliveryProvider_get',
  'deliveryProvider_add',
  'deliveryProvider_update',
  'deliveryProvider_remove',
  'paymentProvider_remove',
  'warehousingProvider_get',
  'warehousingProvider_add',
  'warehousingProvider_update',
  'warehousingProvider_remove',
] as const;

export const MultipleProviderReturnTools = [
  'paymentProviders_list',
  'deliveryProviders_list',
  'warehousingProviders_list',
] as const;

export const MultipleInterfaceReturnTools = [
  'paymentInterfaces_list',
  'deliveryInterfaces_list',
  'warehousingInterfaces_list',
] as const;

export const MultipleOrderReturnTool = ['orders_list'] as const;

export const AllTools = [
  'ordersSales_summary',
  ...MultipleInterfaceReturnTools,
  ...SingleProviderReturnTools,
  ...MultipleProviderReturnTools,
  ...SingleProductReturnTools,
  ...MultipleProductReturnTools,
  ...TextsReturnTools,
  ...SingleAssortmentReturnTools,
  ...MultipleAssortmentReturnTools,
  ...SingleCountryReturnTools,
  ...MultipleCountryReturnTools,
  ...SingleCurrencyReturnTools,
  ...MultipleCurrencyReturnTools,
  ...SingleLanguageReturnTools,
  ...MultipleLanguageReturnTools,
  ...MediaListReturnTools,
  ...SkippedToolResponse,
  ...ProductVariationsReturnTools,
  ...ProductAssignmentsReturnTools,
  ...ProductBundleReturnTools,
  ...PriceReturnTools,
  ...OtherTools,
  ...MultipleOrderReturnTool,
] as const;

export type ToolName = (typeof AllTools)[number];
const useToolTextNormalizer = () => {
  const { formatMessage } = useIntl();

  const normalizeToolName = (toolName: ToolName | string): string => {
    if (!toolName) return '';

    const parts = toolName.split('_');
    if (parts.length !== 2) return toolName;

    const [rawSubject, rawAction] = parts;
    const splitCamelCase = (str: string): string[] =>
      str
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .split(' ')
        .map(capitalize);

    const match = rawAction.match(/^([a-z]+)(.*)$/);
    const verb = match?.[1] ?? rawAction;
    const action = match?.[2] ?? '';

    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    const subject = splitCamelCase(rawSubject);
    const word = action ? capitalize(action) : '';

    return `${capitalize(verb)} ${subject.join(' ')}${word ? ` ${word}` : ''}`;
  };

  const getToolDescription = useCallback(
    (toolName: string): string => {
      const name = toolName.toLowerCase();

      const TOOL_TO_DESCRIPTION_MATCH: Partial<Record<ToolName, string>> = {
        product_list: formatMessage({
          id: 'list_product_tool_definition',
          defaultMessage: 'Show me all draft products',
        }),

        product_get: formatMessage({
          id: 'get_product_tool_definition',
          defaultMessage: 'Get details for product ABC123',
        }),
        product_create: formatMessage({
          id: 'create_product_tool_definition',
          defaultMessage: 'Create a new product',
        }),
        product_publish: formatMessage({
          id: 'publish_product_tool_definition',
          defaultMessage: 'Publish product XYZ456',
        }),
        product_unpublish: formatMessage({
          id: 'unpublish_product_tool_definition',
          defaultMessage: 'Unpublish the winter collection',
        }),
        product_remove: formatMessage({
          id: 'delete_product_tool_definition',
          defaultMessage: 'Delete product OLD123',
        }),
        productMedia_remove: formatMessage({
          id: 'remove_product_media_tool_definition',
          defaultMessage: 'Remove product media',
        }),
        product_addMedia: formatMessage({
          id: 'add_product_media_tool_definition',
          defaultMessage: 'Add media to product',
        }),
        shop_info: formatMessage({
          id: 'shop_info_tool_definition',
          defaultMessage: 'Show shop configuration',
        }),
        generateImage: formatMessage({
          id: 'generate_image_tool_definition',
          defaultMessage: 'Generate a hero banner image',
        }),
      };
      if (TOOL_TO_DESCRIPTION_MATCH[name]) {
        return `"${TOOL_TO_DESCRIPTION_MATCH[name]}"`;
      }
      if (name.includes('assortment'))
        return formatMessage({
          id: 'assortment_management_tool_definition',
          defaultMessage: '"Manage product categories"',
        });
      if (name.includes('media') && name.includes('remove'))
        return formatMessage({
          id: 'media_remover_tool_definition',
          defaultMessage: '"Remove media files"',
        });
      if (name.includes('media') && name.includes('add'))
        return formatMessage({
          id: 'media_add_tool_definition',
          defaultMessage: '"Add media files"',
        });
      if (name.includes('media'))
        return formatMessage({
          id: 'media_management_tool_definition',
          defaultMessage: '"Manage media files"',
        });

      return formatMessage(
        {
          id: 'general_tool_definition',
          defaultMessage: `"Help me with {toolName}"`,
        },
        { toolName: normalizeToolName(toolName) },
      );
    },
    [formatMessage],
  );

  return {
    getToolDescription,
    normalizeToolName,
  };
};

export default useToolTextNormalizer;
