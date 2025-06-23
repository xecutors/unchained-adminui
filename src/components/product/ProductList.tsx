import React, { useState, useEffect } from 'react';
import { Squares2X2Icon, ListBulletIcon } from '@heroicons/react/24/outline';
import ProductListItem from './ProductListItem';
import ProductListItemCompact from './ProductListItemCompact';

interface ProductListProps {
  products: any[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(() => {
    if (typeof window !== 'undefined') {
      return (
        (localStorage.getItem('product-view-mode') as 'grid' | 'list') || 'grid'
      );
    }
    return 'grid';
  });

  useEffect(() => {
    localStorage.setItem('product-view-mode', viewMode);
  }, [viewMode]);

  return (
    <div>
      <div className="flex justify-end mb-4">
        <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-700 rounded-lg">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'grid'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
            title="Grid view"
          >
            <Squares2X2Icon className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'list'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
            title="List view"
          >
            <ListBulletIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div
          className="gap-5"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gridTemplateRows: 'span 6',
          }}
        >
          {products.map((product) => (
            <ProductListItem key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {products.map((product) => (
            <ProductListItemCompact key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
