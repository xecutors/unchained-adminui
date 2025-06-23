import React from 'react';
import ProductDetail from '../../modules/product/components/ProductDetail';
import { ProductList } from '../product';
import UnknownToolResponse from './UnknownToolResponse';

interface ToolInvocationRendererProps {
  part: any;
}

const ToolInvocationRenderer: React.FC<ToolInvocationRendererProps> = ({
  part,
}) => {
  const { toolName, result } = part.toolInvocation ?? {};
  if (!toolName || !result?.content?.length) return null;

  try {
    const [{ text }] = result.content;
    const parsed = JSON.parse(text);
    const listViewTools = [
      'create_product',
      'remove_product',
      'publish_product',
      'unpublish_product',
    ];

    if (toolName === 'list_products' && parsed?.products?.length) {
      return (
        <div className="mb-6">
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
  } catch {
    return (
      <div className="text-sm text-red-500 mb-4">
        Failed to parse tool result.
      </div>
    );
  }
};

export default ToolInvocationRenderer;
