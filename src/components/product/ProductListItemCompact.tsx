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

interface ProductListItemCompactProps {
  product: any;
}

const ProductListItemCompact: React.FC<ProductListItemCompactProps> = ({
  product,
}) => {
  const { formatPrice } = useFormatPrice();
  const { texts, media, catalogPrice, commerce } = product;
  const text = Array.isArray(texts) && texts.length > 0 ? texts[0] : {};

  // Get price from either catalogPrice or commerce.pricing
  const price = catalogPrice || commerce?.pricing?.[0];

  return (
    <div className="flex items-center gap-4 p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow duration-200">
      <div className="w-16 h-16 flex-shrink-0 bg-slate-50 dark:bg-slate-700 rounded-md overflow-hidden">
        {media?.length ? (
          <ImageWithFallback
            src={media[0]?.file.url}
            alt={text?.title}
            className="w-full h-full object-cover"
            width={64}
            height={64}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400">
            <span className="text-2xl">📦</span>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
          {text.title || 'Untitled Product'}
        </h3>
        <div className="flex items-center gap-3 mt-1">
          <Badge
            text={PRODUCT_STATUS_LABELS[product?.status] || 'Draft'}
            color={PRODUCT_STATUS[product?.status] || 'yellow'}
            square
            dotted
          />
          <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-600 px-2 py-1 rounded">
            {(product.__typename || product.type || 'SimpleProduct').replace(
              'Product',
              '',
            ) || 'Simple'}
          </span>
          <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
            {price ? (
              <>{formatPrice(price)}</>
            ) : (
              <span className="text-slate-400">No price</span>
            )}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            ID: {product._id}
          </span>
        </div>
      </div>

      <Link
        href={`/products?slug=${generateUniqueId(product)}`}
        className="px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
      >
        Edit
      </Link>
    </div>
  );
};

export default ProductListItemCompact;
