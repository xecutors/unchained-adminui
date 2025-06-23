import { useIntl } from 'react-intl';
import { IProduct, IProductTexts } from '../../gql/types';

import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import useFormatDateTime from '../../modules/common/utils/useFormatDateTime';
import ProductDetail from '../../modules/product/components/ProductDetail';
import useProduct from '../../modules/product/hooks/useProduct';

const ProductDetailPage = ({ slug }) => {
  const { formatMessage } = useIntl();
  const { formatDateTime } = useFormatDateTime();

  const { product, loading, extendedData } = useProduct({
    slug,
  });

  return (
    <div className="mt-5 max-w-full">
      <BreadCrumbs
        routeName={slug}
        depth={3}
        currentPageTitle={
          ((product as IProduct)?.texts as IProductTexts)?.title
        }
      />
      <div>
        <div className="align-center flex-wrap flex min-w-full justify-between">
          <PageHeader
            headerText={
              <>
                {((product as IProduct)?.texts as IProductTexts)?.title ||
                  'Untitled Product'}
              </>
            }
            title={`${((product as IProduct)?.texts as IProductTexts)?.title || 'Product'} (${product?._id})`}
          />
          <span className="mt-3 text-md">{product?._id}</span>
        </div>

        <div className="mt-5 flex flex-wrap gap-4 text-xs text-slate-600 dark:text-slate-400">
          {product?.created && (
            <div className="flex items-center gap-1">
              <span className="text-slate-700 dark:text-slate-300">
                {formatMessage({ id: 'created', defaultMessage: 'Created' })}:
              </span>
              <span className="font-semibold">
                {formatDateTime(product.created, {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </span>
            </div>
          )}

          {product?.published && (
            <div className="flex items-center gap-1">
              <span className="text-slate-700 dark:text-slate-300">
                {formatMessage({
                  id: 'published',
                  defaultMessage: 'Published',
                })}
                :
              </span>
              <span className="font-semibold">
                {formatDateTime(product.published, {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </span>
            </div>
          )}

          {product?.updated && (
            <div className="flex items-center gap-1">
              <span className="text-slate-700 dark:text-slate-300">
                {formatMessage({ id: 'updated', defaultMessage: 'Updated' })}:
              </span>
              <span className="font-semibold">
                {formatDateTime(product.updated, {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </span>
            </div>
          )}
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <ProductDetail product={product} extendedData={extendedData} />
      )}
    </div>
  );
};

export default ProductDetailPage;
