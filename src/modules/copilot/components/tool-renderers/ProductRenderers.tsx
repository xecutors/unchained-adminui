import { ReactElement } from 'react';

import { ProductListItemCompact, ProductList } from '../product';
import AssignmentListCompact from '../product/AssignmentListCompact';
import AssignmentListItemCompact from '../product/AssignmentListItemCompact';
import CopilotMediaList from '../product/CopilotMediaList';
import CopilotPriceCompact from '../product/CopilotPriceCompact';
import VariationListCompact from '../product/VariationListCompact';
import VariationListItemCompact from '../product/VariationListItemCompact';
import ProductResultsSummary from '../ProductResultsSummary';

import { renderTexts } from './textRenderers';
import OperationStatusIndicator from '../OperationStatusIndicator';

type RendererFn = (data: unknown) => ReactElement | null;

interface RendererParams {
  action?: string;
  data?: any;
}

const renderMultipleProducts: RendererFn = (data: any) =>
  data?.products?.length ? (
    <div className="mb-6">
      <ProductResultsSummary
        products={data.products}
        requestedFilters={data.filters}
      />
      <ProductList products={data.products} />
    </div>
  ) : null;

const renderVariations: RendererFn = (data: any) =>
  data?.product ? (
    <div className="mb-6">
      <VariationListCompact
        variations={data?.product?.variations}
        product={data.product}
      />
    </div>
  ) : null;

export const renderPrice: RendererFn = (data: any) =>
  data?.product ? (
    <div className="mb-6">
      <CopilotPriceCompact
        price={data?.price}
        product={data?.product}
        leveledCatalogPrice={data?.leveledCatalogPrice}
        priceRange={data?.priceRange}
      />
    </div>
  ) : null;

const toolsMap: Record<string, RendererFn> = {
  LIST: renderMultipleProducts,
  GET_VARIATION_PRODUCTS: renderMultipleProducts,
  GET_PRODUCTS: renderMultipleProducts,
  GET: (data) => <ProductListItemCompact {...(data as any)} />,
  CREATE: (data) => <ProductListItemCompact {...(data as any)} />,
  UPDATE: (data) => <ProductListItemCompact {...(data as any)} />,
  REMOVE: (data) => <OperationStatusIndicator {...(data as any)} />,
  UPDATE_STATUS: (data) => <ProductListItemCompact {...(data as any)} />,

  CREATE_OPTION: (data) => <ProductListItemCompact {...(data as any)} />,
  CREATE_VARIATION: (data) => <ProductListItemCompact {...(data as any)} />,
  ADD_VARIATION_OPTION: (data) => <ProductListItemCompact {...(data as any)} />,

  GET_PRODUCT_TEXTS: renderTexts('GET_PRODUCT_TEXTS'),
  GET_VARIATION_TEXTS: renderTexts('GET_VARIATION_TEXTS'),
  GET_MEDIA_TEXTS: renderTexts('GET_MEDIA_TEXTS'),
  UPDATE_VARIATION_TEXTS: renderTexts('UPDATE_VARIATION_TEXTS'),
  UPDATE_MEDIA_TEXTS: renderTexts('UPDATE_MEDIA_TEXTS'),

  ADD_ASSIGNMENT: (data) => <AssignmentListItemCompact {...(data as any)} />,
  GET_ASSIGNMENTS: (data) => <AssignmentListCompact {...(data as any)} />,

  ADD_MEDIA: (data) => <CopilotMediaList {...(data as any)} />,
  GET_MEDIA: (data) => <CopilotMediaList {...(data as any)} />,
  REORDER_MEDIA: (data) => <CopilotMediaList {...(data as any)} />,

  REMOVE_ASSIGNMENT: (data) => <OperationStatusIndicator {...(data as any)} />,
  REMOVE_MEDIA: (data) => <OperationStatusIndicator {...(data as any)} />,
  ADD_BUNDLE_ITEM: (data) => <ProductListItemCompact {...(data as any)} />,
  REMOVE_BUNDLE_ITEM: (data) => <OperationStatusIndicator {...(data as any)} />,

  GET_BUNDLE_ITEMS: (data) => <ProductListItemCompact {...(data as any)} />,

  GET_SIBLINGS: renderMultipleProducts,
};
export const ProductRenderers = ({ action, data, ...rest }: RendererParams) => {
  if (!action) return null;

  const renderFn = toolsMap[action];
  if (!renderFn) {
    return (
      <pre className="p-2 bg-gray-100 rounded text-xs overflow-auto">
        {JSON.stringify({ action, data }, null, 2)}
      </pre>
    );
  }

  return renderFn({ ...data, ...rest });
};

export default ProductRenderers;
