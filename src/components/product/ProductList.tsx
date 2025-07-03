import React, { useState, useEffect } from 'react';
import { Squares2X2Icon, ListBulletIcon } from '@heroicons/react/24/outline';
import { useIntl } from 'react-intl';
import ProductListItem from './ProductListItem';
import ProductListItemCompact from './ProductListItemCompact';

interface ProductListProps {
  products: any[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const { formatMessage } = useIntl();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(() => {
    if (typeof window !== 'undefined') {
      return (
        (localStorage.getItem('product-view-mode') as 'grid' | 'list') || 'list'
      );
    }
    return 'list';
  });

  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  useEffect(() => {
    localStorage.setItem('product-view-mode', viewMode);
  }, [viewMode]);

  // Filter products based on selected status
  const filteredProducts =
    statusFilter === 'ALL'
      ? products
      : products.filter((p) => p.status === statusFilter);

  // Get unique statuses from products
  const availableStatuses = [...new Set(products.map((p) => p.status))].filter(
    Boolean,
  );

  return (
    <div>
      <div className="flex justify-between mb-4">
        {availableStatuses.length > 1 && (
          <div className="flex gap-2">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                statusFilter === 'ALL'
                  ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {formatMessage({ id: 'all', defaultMessage: 'All' })} (
              {products.length})
            </button>
            {availableStatuses.map((status) => {
              const count = products.filter((p) => p.status === status).length;
              return (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    statusFilter === status
                      ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {status} ({count})
                </button>
              );
            })}
          </div>
        )}
        <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-700 rounded-lg ml-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'grid'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
            title={formatMessage({
              id: 'grid_view',
              defaultMessage: 'Grid view',
            })}
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
            title={formatMessage({
              id: 'list_view',
              defaultMessage: 'List view',
            })}
          >
            <ListBulletIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div
          className="gap-4 max-w-full overflow-hidden"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gridTemplateRows: 'span 6',
          }}
        >
          {filteredProducts.map((product) => (
            <ProductListItem key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="space-y-2 max-w-full overflow-hidden">
          {filteredProducts.map((product) => (
            <ProductListItemCompact key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
