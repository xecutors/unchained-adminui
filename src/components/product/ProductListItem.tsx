import React from 'react';
import Link from 'next/link';
import { useIntl } from 'react-intl';
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

interface ProductListItemProps {
  product: any;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  const { formatMessage } = useIntl();
  const { formatPrice } = useFormatPrice();
  const { texts, media, catalogPrice, commerce } = product;
  const text = Array.isArray(texts) && texts.length > 0 ? texts[0] : {};

  // Get price from either catalogPrice or commerce.pricing
  const price = catalogPrice || commerce?.pricing?.[0];

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return formatMessage({ id: 'active', defaultMessage: 'Active' });
      case 'DRAFT':
        return formatMessage({ id: 'draft', defaultMessage: 'Draft' });
      case 'DELETED':
        return formatMessage({ id: 'deleted', defaultMessage: 'Deleted' });
      default:
        return formatMessage({ id: 'draft', defaultMessage: 'Draft' });
    }
  };

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
      <div className="px-4 flex items-center gap-2">
        <Badge
          text={getStatusLabel(product?.status)}
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
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300 px-4">
        {price ? (
          <>{formatPrice(price)}</>
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
          {formatMessage({ id: 'edit', defaultMessage: 'Edit' })}
        </Link>
      </div>
    </div>
  );
};

export default ProductListItem;
