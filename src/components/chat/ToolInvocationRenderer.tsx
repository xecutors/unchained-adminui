import React from 'react';
import ProductDetail from '../../modules/product/components/ProductDetail';
import { ProductList } from '../product';
import CopilotAssortmentList from '../../modules/chat/components/CopilotAssortmentList';
import AssortmentResultsSummary from '../../modules/chat/components/AssortmentResultsSummary';
import UnknownToolResponse from './UnknownToolResponse';
import ProductResultsSummary from './ProductResultsSummary';
import Image from 'next/image';
import ShopInfoCard from './ShopInfo';

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
    const listViewTools = [
      'product_create',
      'product_update',
      'product_updateCommerce',
      'product_remove',
      'product_publish',
      'product_unpublish',
      'assortment_create',
      'assortment_update',
      'assortment_remove',
      'product_get',
    ];

    if (toolName === 'product_list' && parsed?.products?.length) {
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

    if (toolName === 'assortment_list' && parsed?.assortments?.length) {
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

    if (toolName === 'assortment_getChildren' && parsed?.assortments?.length) {
      return (
        <div className="mb-6">
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
    if (listViewTools.includes(toolName) && parsed?.product)
      return (
        <div className="mb-6">
          <ProductList products={[parsed.product]} />
        </div>
      );

    if (listViewTools.includes(toolName) && parsed?.assortment)
      return (
        <div className="mb-6">
          <CopilotAssortmentList assortments={[parsed.assortment]} />
        </div>
      );

    if (toolName === 'assortment_getProducts') {
      return (
        <div className="mb-6">
          <ProductResultsSummary
            products={parsed.products}
            requestedFilters={parsed?.filters}
          />
          <ProductList products={parsed.products} />
        </div>
      );
    }

    // Check if any tool returned product data and show it
    if (parsed?.product && !listViewTools.includes(toolName)) {
      return (
        <div className="mb-6">
          <ProductList products={[parsed.product]} />
        </div>
      );
    }

    // Check if any tool returned assortment data and show it
    if (parsed?.assortment && !listViewTools.includes(toolName)) {
      return (
        <div className="mb-6">
          <CopilotAssortmentList assortments={[parsed.assortment]} />
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
