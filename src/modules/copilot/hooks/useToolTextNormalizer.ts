import { useCallback } from 'react';
import { useIntl } from 'react-intl';

export const ProductVariationsReturnTools = ['product_variations'] as const;
export const ProductAssignmentsReturnTools = ['product_assignments'] as const;
export const ProductBundleReturnTools = [
  'product_bundleItems',
  'product_removeBundleItem',
  'product_addBundleItem',
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

export const MediaListReturnTools = [
  'product_getMedias',
  'assortment_getMedias',
  'product_reorderMedias',
  'assortment_reorderMedias',
  'generateImage',
] as const;

export const OtherTools = ['shop_info', 'generateImage'] as const;

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

export const OrderTools = ['order_management'] as const;
export const ProviderTools = ['provider_management'] as const;
export const LocalizationTools = ['localization_management'] as const;
export const ProductTools = ['product_management'] as const;
export const AllTools = [
  ...ProductTools,
  ...LocalizationTools,
  ...OrderTools,
  ...ProviderTools,
  ...SingleAssortmentReturnTools,
  ...MultipleAssortmentReturnTools,
  ...MediaListReturnTools,
  ...SkippedToolResponse,
  ...ProductVariationsReturnTools,
  ...ProductAssignmentsReturnTools,
  ...ProductBundleReturnTools,
  ...PriceReturnTools,
  ...OtherTools,
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
        product_create: formatMessage({
          id: 'create_product_tool_definition',
          defaultMessage: 'Create a new product',
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
