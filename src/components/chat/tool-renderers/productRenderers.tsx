import { ProductList, ProductListItemCompact } from '../../product';
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
