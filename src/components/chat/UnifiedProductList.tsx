import React, { useState } from 'react';
import { ProductList } from '../product';
import ProductResultsSummary from './ProductResultsSummary';

interface UnifiedProductListProps {
  productSections: Array<{
    products: any[];
    filters?: any;
    title?: string;
  }>;
}

const UnifiedProductList: React.FC<UnifiedProductListProps> = ({
  productSections,
}) => {
  // Combine all products from all sections
  const allProducts = productSections.flatMap((section) => section.products);

  // Combine all filters (if any)
  const combinedFilters = productSections.reduce((acc, section) => {
    if (section.filters) {
      return { ...acc, ...section.filters };
    }
    return acc;
  }, {});

  if (!allProducts.length) return null;

  return (
    <div className="mb-6 w-full max-w-full overflow-hidden">
      <div className="max-w-full overflow-hidden">
        <ProductResultsSummary
          products={allProducts}
          requestedFilters={
            Object.keys(combinedFilters).length ? combinedFilters : undefined
          }
        />
      </div>
      <div className="w-full max-w-full overflow-hidden">
        <ProductList products={allProducts} />
      </div>
    </div>
  );
};

export default UnifiedProductList;
