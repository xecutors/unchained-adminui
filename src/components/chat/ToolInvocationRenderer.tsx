import React from 'react';
import ProductDetail from '../../modules/product/components/ProductDetail';
import { ProductList } from '../product';
import UnknownToolResponse from './UnknownToolResponse';
import ProductResultsSummary from './ProductResultsSummary';

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
        <div className="mt-4 text-sm text-amber-600 dark:text-amber-400 mb-4 p-3 bg-amber-50 dark:bg-amber-950 rounded-md">
          <div className="font-medium mb-1">Tool Response:</div>
          <div>{textString}</div>
        </div>
      );
    }

    const parsed = JSON.parse(textString);
    const listViewTools = [
      'create_product',
      'remove_product',
      'publish_product',
      'unpublish_product',
    ];

    if (toolName === 'list_products' && parsed?.products?.length) {
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

    if (listViewTools.includes(toolName) && parsed?.product)
      return (
        <div className="mb-6">
          <ProductList products={[parsed.product]} />
        </div>
      );

    if (toolName === 'get_product' && parsed?.product) {
      return (
        <div className="mb-6">
          <ProductDetail
            key={parsed.product._id}
            product={{
              ...parsed.product,
            }}
          />
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
      <div className="text-sm text-red-500 mb-4">
        <div>Failed to parse tool result.</div>
        <details className="mt-2">
          <summary className="cursor-pointer text-xs">Debug info</summary>
          <pre className="text-xs mt-1 p-2 bg-red-50 dark:bg-red-950 rounded overflow-auto">
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
