import React from 'react';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import { IProduct } from '../../../../gql/types';
import ImageWithFallback from '../../../common/components/ImageWithFallback';
import generateUniqueId from '../../../common/utils/getUniqueId';
import { useFormatPrice } from '../../../common/utils/utils';
import { ProductStatusBadge } from '../../../product/components/ProductStatusBadge';

type Variation = {
  key: string;
  type: string;
  options: string[];
};

type Props = {
  product: IProduct & {
    _id: string;
    __typename?: string;
    type: string;
    variations: Variation[];
    proxy?: { assignments?: any[] };
    catalogPrice?: any;
    commerce?: any;
  };
  children?: React.ReactNode;
  tab?: string;
};

const ProductItemWrapperCompact: React.FC<Props> = ({
  product,
  tab = null,
  children,
}) => {
  const { formatMessage } = useIntl();
  const { formatPrice } = useFormatPrice();
  const { texts, media, catalogPrice, commerce } = product;
  const text = texts?.[0] ?? texts ?? {};
  const price = catalogPrice || commerce?.pricing?.[0];

  if (!product) return children;
  const imageUrl = media?.[0]?.file?.url;
  const totalVariations = product?.variations?.length || 0;
  const totalAssignments = product?.proxy?.assignments?.length ?? 0;

  return (
    <div className="relative border rounded-xl p-4 shadow-sm bg-white dark:bg-slate-900 space-y-4">
      <Link
        href={`/products?slug=${generateUniqueId(product)}${tab ? `&tab=${tab}` : ''}`}
        className="absolute top-2 right-2 px-2 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
      >
        {formatMessage({ id: 'edit', defaultMessage: 'Edit' })}
      </Link>
      <div className="flex items-center gap-4">
        <ImageWithFallback
          src={imageUrl}
          alt="Product image"
          width={60}
          height={60}
          className="rounded-md object-cover shrink-0"
        />

        <div className="flex-1 space-y-1 overflow-hidden">
          <div className="text-sm font-semibold text-slate-900 dark:text-white truncate">
            {text?.title || 'Untitled Product'}
          </div>
          <div className="flex items-center gap-3 mt-1">
            <ProductStatusBadge status={product?.status} />
            <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-600 px-2 py-1 rounded">
              {(product.__typename || product.type || 'SimpleProduct').replace(
                '_PRODUCT',
                '',
              )}
            </span>
            <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
              {price ? (
                <>{formatPrice(price)}</>
              ) : (
                <span className="text-slate-400">No price</span>
              )}
            </span>

            <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {formatMessage({ id: 'id', defaultMessage: 'ID' })}: {product._id}
            </span>
          </div>

          <div className="flex flex-wrap text-xs text-slate-600 dark:text-slate-300 gap-x-4 gap-y-1">
            {product?.type === 'CONFIGURABLE_PRODUCT' && (
              <>
                <div>
                  {formatMessage({
                    id: 'variations',
                    defaultMessage: 'Variations',
                  })}
                  : <strong>{totalVariations}</strong>
                </div>
                <div>
                  {formatMessage({
                    id: 'products',
                    defaultMessage: 'Products',
                  })}
                  : <strong>{totalAssignments}</strong>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {children && <div className="pt-1">{children}</div>}
    </div>
  );
};

export default ProductItemWrapperCompact;
