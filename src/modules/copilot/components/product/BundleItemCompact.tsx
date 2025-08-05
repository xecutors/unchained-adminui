import React from 'react';

import Link from 'next/link';
import { useIntl } from 'react-intl';

import ProductItemWrapperCompact from './ProductItemWrapperCompact';
import { IProduct } from '../../../../gql/types';
import ImageWithFallback from '../../../common/components/ImageWithFallback';
import generateUniqueId from '../../../common/utils/getUniqueId';
import { useFormatPrice } from '../../../common/utils/utils';

type BundleItemCompactProps = {
  bundleItems: {
    product: any;
    quantity: number;
  }[];
  product: IProduct & any;
};

const BundleItemCompact: React.FC<BundleItemCompactProps> = ({
  bundleItems,
  product: bundleProduct,
}) => {
  const { formatMessage } = useIntl();
  const { formatPrice } = useFormatPrice();
  return (
    <ProductItemWrapperCompact product={bundleProduct} tab="bundled_products">
      {(bundleItems || []).map(({ product, quantity }, index) => {
        const title = product?.texts?.title ?? 'Untitled Product';
        const sku = product?.warehousing?.sku;
        const type = product?.type?.replace('_PRODUCT', '');
        const image = product?.media?.[0]?.file?.url;
        const price = formatPrice(product?.commerce?.pricing?.[0]);
        return (
          <div
            key={`${product?._id}-${index}`}
            className="flex items-center gap-4 border rounded-xl p-3 shadow-sm bg-white dark:bg-slate-900"
          >
            <ImageWithFallback
              src={image}
              alt={title}
              width={60}
              height={60}
              className="rounded-md object-cover"
            />

            <div className="flex-1 space-y-1">
              <div className="text-sm font-semibold text-slate-900 dark:text-white">
                {title}
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400">
                {type} ·{formatMessage({ id: 'sku', defaultMessage: 'SKU' })}:{' '}
                {sku}
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-300">
                {formatMessage({ id: 'quantity', defaultMessage: 'Quantity' })}:{' '}
                {quantity}
              </div>

              <span className="text-xs text-slate-500 dark:text-slate-400">
                {formatMessage({ id: 'id', defaultMessage: 'ID' })}:{' '}
                {product?._id}
              </span>
            </div>
            {price && (
              <div className="text-right text-sm font-semibold text-slate-900 dark:text-white min-w-[80px]">
                {price}
              </div>
            )}
            <div className="ml-4">
              <Link
                href={`/products?slug=${generateUniqueId({ ...product })}`}
                className="text-sm px-3 py-1 rounded-md border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-white"
              >
                {formatMessage({ id: 'edit', defaultMessage: 'Edit' })}
              </Link>
            </div>
          </div>
        );
      })}
    </ProductItemWrapperCompact>
  );
};

export default BundleItemCompact;
