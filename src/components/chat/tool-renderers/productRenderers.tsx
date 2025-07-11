import { ProductList, ProductListItemCompact } from '../../product';
import AssignmentListCompact from '../../product/AssignmentListCompact';
import BundleItemCompact from '../../product/BundleItemCompact';
import SimulatedPriceCompact from '../../product/SimulatedPriceCompact';
import SimulatedPriceRangeCompact from '../../product/SimulatedPriceRangeCompact';
import VariationListCompact from '../../product/VariationListCompact';
import ProductResultsSummary from '../ProductResultsSummary';

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

export const renderVariations = (data: any) =>
  data?.variations?.length ? (
    <div className="mb-6">
      <VariationListCompact variations={data.variations} />
    </div>
  ) : null;

export const renderAssignments = (data: any) =>
  data?.assignments?.length ? (
    <div className="mb-6">
      <AssignmentListCompact assignments={data.assignments} />
    </div>
  ) : null;

export const renderBundles = (data: any) =>
  data?.bundleItems?.length ? (
    <div className="mb-6">
      <BundleItemCompact bundleItems={data.bundleItems} />
    </div>
  ) : null;

export const renderSimulatedPriceRange = (data: any) =>
  data?.priceRange && data?.product ? (
    <div className="mb-6">
      <SimulatedPriceRangeCompact
        priceRange={data?.priceRange}
        product={data?.product}
      />
    </div>
  ) : null;

export const renderSimulatedPrice = (data: any) =>
  data?.price && data?.product ? (
    <div className="mb-6">
      <SimulatedPriceCompact price={data?.price} product={data?.product} />
    </div>
  ) : null;
