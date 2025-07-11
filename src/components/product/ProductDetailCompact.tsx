import React from 'react';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import ImageWithFallback from '../../modules/common/components/ImageWithFallback';
import generateUniqueId from '../../modules/common/utils/getUniqueId';
import { IProduct } from '../../gql/types';

type Variation = {
  key: string;
  type: string;
  options: string[];
};

type Props = {
  product: IProduct & {
    type: string;
    variations: Variation[];
    proxy?: { assignments?: any[] };
  };
  children?: React.ReactNode;
};

const ProductDetailCompact: React.FC<Props> = ({ product, children }) => {
  const { formatMessage } = useIntl();

  const imageUrl = product?.media?.[0]?.file?.url;
  const totalVariations = product?.variations?.length || 0;
  const totalAssignments = product?.proxy?.assignments?.length ?? 0;

  return (
    <div className="relative border rounded-xl p-4 shadow-sm bg-white dark:bg-slate-900 space-y-4">
      <Link
        href={`/products?slug=${generateUniqueId(product)}`}
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
            {product.texts?.title || 'Untitled Product'}
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
            <div className="truncate">
              {formatMessage({ id: 'id', defaultMessage: 'ID' })}:{' '}
              <span className="font-mono">{product._id}</span>
            </div>
          </div>
        </div>
      </div>

      {children && <div className="pt-1">{children}</div>}
    </div>
  );
};

export default ProductDetailCompact;
