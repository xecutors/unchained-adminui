import React from 'react';
import { ProductList, ProductListItemCompact } from '../product';
import CopilotAssortmentList from '../../modules/chat/components/CopilotAssortmentList';
import AssortmentResultsSummary from '../../modules/chat/components/AssortmentResultsSummary';
import UnknownToolResponse from './UnknownToolResponse';
import ProductResultsSummary from './ProductResultsSummary';
import Image from 'next/image';
import ShopInfoCard from './ShopInfo';
import TextsList from './TextsList';
import { AssortmentListItemCompact } from '../assortment';

interface ToolInvocationRendererProps {
  part: any;
}

const ToolInvocationRenderer: React.FC<ToolInvocationRendererProps> = ({
  part,
}) => {
  const { toolName, result } = part.toolInvocation ?? {};
  if (!toolName || !result?.content?.length) return null;

  try {
    // Safely extract text from content
    const content = result.content[0];
    const text = content?.text || content;

    // If text is not a string, try to stringify it
    const textString = typeof text === 'string' ? text : JSON.stringify(text);

    // Check if the response is an error message instead of JSON
    if (textString && textString.startsWith('Error')) {
      return (
        <div className="mt-4 text-sm border border-amber-200 text-amber-700 dark:text-amber-400 mb-4 p-3 bg-amber-50 dark:bg-amber-950 rounded-md">
          <div className="font-medium mb-1">Tool Response:</div>
          <div>{textString}</div>
        </div>
      );
    }

    const parsed = JSON.parse(textString);

    const SingleProductReturnTools = [
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
    ];
    const TextsReturnTools = [
      'product_updateTexts',
      'productMedia_updateTexts',
      'product_getTexts',
      'productMedia_getTexts',
      'productVariation_getTexts',
      'assortmentMedia_updateTexts',
      'assortmentMedia_getTexts',
      'assortment_getTexts',
      'assortment_updateTexts',
    ];

    const MultipleProductReturnTools = [
      'product_list',
      'assortment_getProducts',
    ];

    const MultipleAssortmentReturnTools = [
      'assortment_getChildren',
      'assortment_list',
    ];

    const SingleAssortmentReturnTools = [
      'assortment_create',
      'assortment_update',
      'assortment_remove',
      'assortment_setBase',
      'assortment_get',
      'assortment_searchProducts',
    ];

    if (
      MultipleProductReturnTools.includes(toolName) &&
      parsed?.products?.length
    ) {
      return (
        <div className="mb-6">
          <ProductResultsSummary
            products={parsed.products}
            requestedFilters={parsed.filters}
          />
          <ProductList products={parsed.products} />
        </div>
      );
    }

    if (
      MultipleAssortmentReturnTools.includes(toolName) &&
      parsed?.assortments
    ) {
      return (
        <div className="mb-6">
          <AssortmentResultsSummary
            assortments={parsed.assortments}
            requestedFilters={parsed?.filters}
          />
          <CopilotAssortmentList assortments={parsed?.assortments} />
        </div>
      );
    }

    if (toolName === 'shop_info' && parsed) {
      return <ShopInfoCard shopInfo={parsed} />;
    }
    if (toolName === 'generateImage' && parsed) {
      return (
        <Image alt="" src={parsed?.imageUrl as any} width={1200} height={50} />
      );
    }
    if (SingleProductReturnTools.includes(toolName) && parsed?.product)
      return (
        <div className="mb-6">
          <ProductListItemCompact product={parsed.product} />
        </div>
      );
    if (TextsReturnTools.includes(toolName) && parsed?.texts)
      return (
        <div className="mb-6">
          <TextsList texts={parsed.texts} />
        </div>
      );

    if (parsed?.assortment && SingleAssortmentReturnTools.includes(toolName)) {
      return (
        <div className="mb-6">
          <AssortmentListItemCompact assortment={parsed?.assortment} />
        </div>
      );
    }

    return (
      <div className="mb-6">
        <UnknownToolResponse data={parsed} />
      </div>
    );
  } catch (error) {
    console.error('Tool result parsing error:', error);
    console.error('Tool name:', toolName);
    console.error('Result content:', result?.content);
    return (
      <div className="text-sm text-rose-500 mb-4">
        <div>Failed to parse tool result.</div>
        <details className="mt-2">
          <summary className="cursor-pointer text-xs">Debug info</summary>
          <pre className="text-xs mt-1 p-2 bg-rose-50 dark:bg-rose-950 rounded overflow-auto">
            Tool: {toolName}
            Error: {error?.message || 'Unknown error'}
            Content: {JSON.stringify(result?.content, null, 2)}
          </pre>
        </details>
      </div>
    );
  }
};

export default ToolInvocationRenderer;
