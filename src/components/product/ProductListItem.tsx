import React from 'react';
import Link from 'next/link';
import { useFormatPrice } from '../../modules/common/utils/utils';
import ImageWithFallback from '../../modules/common/components/ImageWithFallback';
import Badge from '../../modules/common/components/Badge';
import generateUniqueId from '../../modules/common/utils/getUniqueId';

const PRODUCT_STATUS = {
  DRAFT: 'yellow',
  ACTIVE: 'green',
  DELETED: 'red',
  null: 'yellow',
  undefined: 'yellow',
};

const PRODUCT_STATUS_LABELS = {
  DRAFT: 'Draft',
  ACTIVE: 'Active',
  DELETED: 'Deleted',
  null: 'Draft',
  undefined: 'Draft',
};

interface ProductListItemProps {
  product: any;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  const { formatPrice } = useFormatPrice();
  const { texts, media, catalogPrice, commerce } = product;
  const text = Array.isArray(texts) && texts.length > 0 ? texts[0] : {};

  // Get price from either catalogPrice or commerce.pricing
  const price = catalogPrice || commerce?.pricing?.[0];

  return (
    <div
      className="gap-3 my-5 bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-300 dark:border-slate-700 overflow-hidden hover:shadow-md transition-shadow duration-200"
      style={{
        display: 'grid',
        gridTemplateRows: 'subgrid',
        gridRow: 'span 6',
      }}
    >
      <div className="aspect-square bg-slate-50 dark:bg-slate-700 relative">
        {media?.length ? (
          <ImageWithFallback
            src={media[0]?.file.url}
            alt={text?.title}
            className="w-full h-full object-contain p-4"
            width={300}
            height={300}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400">
            <div className="text-center">
              <div className="text-6xl mb-2">📦</div>
              <div className="text-sm">No Image</div>
            </div>
          </div>
        )}
      </div>
      <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 px-4 line-clamp-2">
        {text.title}
      </h3>
      <div className="px-4">
        <Badge
          text={PRODUCT_STATUS_LABELS[product?.status] || 'Draft'}
          color={PRODUCT_STATUS[product?.status] || 'yellow'}
          square
          dotted
        />
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300 px-4">
        {price ? (
          <>
            {price.currencyCode || 'CHF'} {(price.amount / 100).toFixed(2)}
          </>
        ) : (
          <span className="text-slate-400">No price</span>
        )}
      </p>
      <p className="text-xs text-slate-500 dark:text-slate-400 px-4">
        {product._id || 'auf Lager'}
      </p>
      <div className="border-t border-slate-100 dark:border-slate-700">
        <Link
          href={`/products?slug=${generateUniqueId(product)}`}
          className="block text-center text-sm text-slate-900 dark:text-slate-200 hover:text-slate-800 dark:hover:text-slate-300 py-3"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default ProductListItem;
