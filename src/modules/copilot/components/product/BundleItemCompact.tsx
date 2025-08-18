import { useIntl } from 'react-intl';
import ImageWithFallback from '../../../common/components/ImageWithFallback';
import { useFormatPrice } from '../../../common/utils/utils';
import Link from 'next/link';
import generateUniqueId from '../../../common/utils/getUniqueId';

const BundleItemCompact = ({ product, quantity }) => {
  const { formatPrice } = useFormatPrice();
  const { formatMessage } = useIntl();
  const title = product?.texts?.title ?? 'Untitled Product';
  const sku = product?.warehousing?.sku;
  const type = product?.type?.replace('_PRODUCT', '');
  const image = product?.media?.[0]?.file?.url;
  const price = formatPrice(product?.commerce?.pricing?.[0]);

  return (
    <div className="flex items-center gap-4 border rounded-xl p-3 shadow-sm bg-white dark:bg-slate-900">
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
          <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-600 px-2 py-1 rounded">
            {type?.replace('_PRODUCT', '')}
          </span>{' '}
          ·{formatMessage({ id: 'sku', defaultMessage: 'SKU' })}: {sku}
        </div>

        <div className="text-xs text-slate-600 dark:text-slate-300">
          {formatMessage({ id: 'quantity', defaultMessage: 'Quantity' })}:{' '}
          {quantity}
        </div>

        <span className="text-xs text-slate-500 dark:text-slate-400">
          {formatMessage({ id: 'id', defaultMessage: 'ID' })}: {product?._id}
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
};

export const BundleItemList = ({ bundleItems }) => {
  if (!bundleItems?.length) return null;

  return bundleItems.map(({ product, quantity }) => (
    <BundleItemCompact
      key={`BundleItemList-${product._id}-${quantity}`}
      product={product}
      quantity={quantity}
    />
  ));
};

export default BundleItemCompact;
