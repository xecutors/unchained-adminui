import { ReactElement } from 'react';

import { ProductListItemCompact, ProductList } from '../product';
import AssignmentListCompact from '../product/AssignmentListCompact';
import AssignmentListItemCompact from '../product/AssignmentListItemCompact';
import { BundleItemList } from '../product/BundleItemCompact';
import BundleProductCompact from '../product/BundleProductCompact';
import CopilotMediaList from '../product/CopilotMediaList';
import CopilotPriceCompact from '../product/CopilotPriceCompact';
import RemovedVectorsDisplay from '../product/RemovedVectorsDisplay';
import VariationListCompact from '../product/VariationListCompact';
import VariationListItemCompact from '../product/VariationListItemCompact';
import ProductResultsSummary from '../ProductResultsSummary';

import { renderTexts } from './textRenderers';

type RendererFn = (data: unknown) => ReactElement | null;

interface RendererParams {
  action?: string;
  data?: unknown;
}

const renderSingleProduct: RendererFn = (data: any) =>
  data?.product ? <ProductListItemCompact product={data.product} /> : null;

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

const renderAssignments: RendererFn = (data: any) =>
  data?.assignments?.length ? (
    <div className="mb-6">
      <AssignmentListCompact assignments={data.assignments} />
    </div>
  ) : null;

const renderBundles: RendererFn = (data: any) =>
  data?.product ? (
    <div className="mb-6">
      <BundleProductCompact
        bundleItems={data?.product?.bundleItems || []}
        product={data?.product}
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
  GET: renderSingleProduct,
  CREATE: renderSingleProduct,
  UPDATE: renderSingleProduct,
  REMOVE: renderSingleProduct,
  UPDATE_STATUS: renderSingleProduct,

  CREATE_OPTION: renderVariations,
  CREATE_VARIATION: (data) => <VariationListItemCompact {...(data as any)} />,
  ADD_VARIATION_OPTION: (data) => (
    <VariationListItemCompact {...(data as any)} />
  ),

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

  REMOVE_ASSIGNMENT: (data) => <RemovedVectorsDisplay {...(data as any)} />,

  ADD_BUNDLE_ITEM: renderBundles,
  REMOVE_BUNDLE_ITEM: renderBundles,

  GET_BUNDLE_ITEMS: (data) => <BundleItemList {...(data as any)} />,

  GET_SIBLINGS: renderMultipleProducts,
};
export const ProductRenderers = ({ action, data }: RendererParams) => {
  if (!action) return null;

  const renderFn = toolsMap[action];
  if (!renderFn) {
    return (
      <pre className="p-2 bg-gray-100 rounded text-xs overflow-auto">
        {JSON.stringify({ action, data }, null, 2)}
      </pre>
    );
  }

  return renderFn(data);
};

export default ProductRenderers;
