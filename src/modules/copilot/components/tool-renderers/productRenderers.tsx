import { ProductListItemCompact, ProductList } from '../product';
import AssignmentListCompact from '../product/AssignmentListCompact';
import AssignmentListItemCompact from '../product/AssignmentListItemCompact';
import BundleItemCompact from '../product/BundleItemCompact';
import CopilotMediaList from '../product/CopilotMediaList';
import CopilotPriceCompact from '../product/CopilotPriceCompact';
import RemovedVectorsDisplay from '../product/RemovedVectorsDisplay';
import VariationListCompact from '../product/VariationListCompact';
import VariationListItemCompact from '../product/VariationListItemCompact';
import ProductResultsSummary from '../ProductResultsSummary';
import { renderTexts } from './textRenderers';

export const renderSingleProduct = (data: any) =>
  data?.product ? <ProductListItemCompact product={data.product} /> : null;

export const renderMultipleProducts = (data: any) =>
  data?.products?.length ? (
    <div className="mb-6">
      <ProductResultsSummary
        products={data.products}
        requestedFilters={data.filters}
      />
      <ProductList products={data.products} />
    </div>
  ) : null;

export const renderVariations = (data: any) => {
  return data?.product ? (
    <div className="mb-6">
      <VariationListCompact
        variations={data?.product?.variations}
        product={data.product}
      />
    </div>
  ) : null;
};

export const renderAssignments = (data: any) =>
  data?.assignments?.length ? (
    <div className="mb-6">
      <AssignmentListCompact
        assignments={data.assignments}
        product={data?.product}
      />
    </div>
  ) : null;

export const renderBundles = (data: any) =>
  data?.product ? (
    <div className="mb-6">
      <BundleItemCompact
        bundleItems={data?.product?.bundleItems || []}
        product={data?.product}
      />
    </div>
  ) : null;

export const renderPrice = (data: any) =>
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

const toolsMap = {
  GET_BUNDLE_ITEMS: renderBundles,
  LIST: renderMultipleProducts,
  GET_VARIATION_PRODUCTS: renderMultipleProducts,
  GET_PRODUCTS: renderMultipleProducts,
  GET: renderSingleProduct,
  CREATE: renderSingleProduct,
  UPDATE: renderSingleProduct,
  REMOVE: renderSingleProduct,
  UPDATE_STATUS: renderSingleProduct,
  CREATE_OPTION: renderVariations,
  CREATE_VARIATION: VariationListItemCompact,
  ADD_VARIATION_OPTION: VariationListItemCompact,
  GET_PRODUCT_TEXTS: renderTexts('GET_PRODUCT_TEXTS'),
  GET_VARIATION_TEXTS: renderTexts('GET_VARIATION_TEXTS'),
  GET_MEDIA_TEXTS: renderTexts('GET_MEDIA_TEXTS'),
  UPDATE_VARIATION_TEXTS: renderTexts('UPDATE_VARIATION_TEXTS'),
  UPDATE_MEDIA_TEXTS: renderTexts('UPDATE_MEDIA_TEXTS'),
  ADD_ASSIGNMENT: AssignmentListItemCompact,
  GET_ASSIGNMENTS: AssignmentListCompact,
  ADD_MEDIA: CopilotMediaList,
  GET_MEDIA: CopilotMediaList,
  REORDER_MEDIA: CopilotMediaList,
  REMOVE_ASSIGNMENT: RemovedVectorsDisplay,
  ADD_BUNDLE_ITEM: renderBundles,
  REMOVE_BUNDLE_ITEM: renderBundles,
};
export const renderProductToolResponses = ({ action, data }) => {
  const Component = toolsMap?.[action];
  return Component ? (
    <Component {...data} />
  ) : (
    JSON.stringify({ action, data }, null, 2)
  );
};
