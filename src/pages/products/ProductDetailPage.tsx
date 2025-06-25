import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { IProduct, IProductTexts } from '../../gql/types';

import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import useFormatDateTime from '../../modules/common/utils/useFormatDateTime';
import ProductDetail from '../../modules/product/components/ProductDetail';
import useProduct from '../../modules/product/hooks/useProduct';
import SelectOptions from '../../modules/common/components/SelectOptions';
import usePublishProduct from '../../modules/product/hooks/usePublishProduct';
import useUnPublishProduct from '../../modules/product/hooks/useUnPublishProduct';
import useUpdateProduct from '../../modules/product/hooks/useUpdateProduct';
import HeaderDeleteButton from '../../modules/common/components/HeaderDeleteButton';
import useRemoveProduct from '../../modules/product/hooks/useRemoveProduct';
import useModal from '../../modules/modal/hooks/useModal';
import DangerMessage from '../../modules/modal/components/DangerMessage';
import CustomError from '../../modules/common/CustomError';
import { useRouter } from 'next/router';
import useAuth from '../../modules/Auth/useAuth';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Button from '../../modules/common/components/Button';

const ProductDetailPage = ({ slug }) => {
  const { formatMessage } = useIntl();
  const { formatDateTime } = useFormatDateTime();
  const { hasRole } = useAuth();
  const { publishProduct } = usePublishProduct();
  const { unPublishProduct } = useUnPublishProduct();
  const { removeProduct } = useRemoveProduct();
  const { updateProduct } = useUpdateProduct();
  const { setModal } = useModal();
  const router = useRouter();

  const { product, loading, error, extendedData } = useProduct({
    slug,
  });

  if (error) {
    console.error('Error loading product:', error);
    return (
      <div className="mt-5 max-w-full">
        <div className="text-center py-8">
          <p className="text-red-600 dark:text-red-400">
            {formatMessage({
              id: 'product_load_error',
              defaultMessage: 'Failed to load product',
            })}
          </p>
        </div>
      </div>
    );
  }

  const updateProductSequence = async (e) => {
    if (e.target.value)
      await updateProduct({
        productId: product?._id,
        product: {
          sequence: parseInt(e.target.value, 10),
        },
      });
  };

  const status = product?.status || 'DRAFT';

  const activeOptions = [
    {
      id: 'published',
      title: formatMessage({
        id: 'published',
        defaultMessage: 'Published',
      }),
      description: formatMessage({
        id: 'publish_product_description',
        defaultMessage:
          'Product will be searchable and is available for orders',
      }),
      current: status === 'ACTIVE',
      selectedTitle: formatMessage({
        id: 'published',
        defaultMessage: 'Published',
      }),
      onClick: async () => {
        try {
          await publishProduct({ productId: product?._id });
          toast.success(
            formatMessage({
              id: 'product_published',
              defaultMessage: 'Published successfully ',
            }),
          );
        } catch (error: any) {
          console.error('Failed to publish product:', error);
          const errorMessage = error?.message || 'Unknown error';
          toast.error(
            `${formatMessage({
              id: 'product_publish_error',
              defaultMessage: 'Failed to publish product',
            })}: ${errorMessage}`
          );
        }
      },
      bgColor: 'green',
    },
    {
      id: 'draft',
      title: formatMessage({
        id: 'draft',
        defaultMessage: 'Draft',
      }),
      description: formatMessage({
        id: 'draft_product_description',
        defaultMessage:
          'Product will not be discoverable and can not be ordered',
      }),
      current: status === 'DRAFT',
      selectedTitle: formatMessage({
        id: 'not_published',
        defaultMessage: 'Not published',
      }),
      bgColor: 'slate',
      disable: status === 'ACTIVE' && !hasRole('unpublishProduct'),
      onClick: async () => {
        if (hasRole('unpublishProduct') || hasRole('publishProduct')) {
          try {
            await unPublishProduct({ productId: product?._id });
            toast.success(
              formatMessage({
                id: 'product_drafted',
                defaultMessage: 'Drafted successfully ',
              }),
            );
          } catch (error: any) {
            console.error('Failed to unpublish product:', error);
            const errorMessage = error?.message || 'Unknown error';
            toast.error(
              `${formatMessage({
                id: 'product_unpublish_error',
                defaultMessage: 'Failed to unpublish product',
              })}: ${errorMessage}`
            );
          }
        }
      },
    },
  ];

  const handleDeleteProduct = async () => {
    await setModal(
      <DangerMessage
        onCancelClick={() => setModal('')}
        message={formatMessage({
          id: 'delete_product_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it and it is nonreversible. Are you sure you want to delete this product?',
        })}
        onOkClick={async () => {
          setModal('');
          try {
            await removeProduct({ productId: product?._id });
            toast.success(
              formatMessage({
                id: 'product_deleted_success',
                defaultMessage: 'Deleted successfully',
              }),
            );
            router.push('/products');
          } catch (e: any) {
            await setModal(
              <DangerMessage
                onCancelClick={() => setModal('')}
                headerText={formatMessage({
                  id: 'error',
                  defaultMessage: 'Error',
                })}
                message={e instanceof CustomError ? e.message : e}
                icon={
                  <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <XMarkIcon
                      className="h-6 w-6 text-rose-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </div>
                }
                okText={formatMessage({ id: 'ok', defaultMessage: 'Ok' })}
                onOkClick={async () => {
                  setModal('');
                }}
              />,
            );
          }
        }}
      />,
    );
  };

  return (
    <div className="mt-5 max-w-full">
      <BreadCrumbs
        routeName={slug}
        depth={3}
        currentPageTitle={product?.texts?.title}
      />
      <div>
        <div className="items-center flex-wrap flex gap-5 min-w-full justify-between">
          <PageHeader
            headerText={product?.texts?.title || 'Untitled Product'}
            title={`${product?.texts?.title || 'Product'} (${product?._id})`}
          />
          <div className="publish-and-order flex flex-wrap gap-3">
            <SelectOptions
              options={activeOptions}
              type={formatMessage({ id: 'product', defaultMessage: 'Product' })}
            />
            <div className="inline-flex items-center gap-2 rounded-md dark:border-slate-600 px-4 py-2 text-sm font-medium leading-5 shadow-xs bg-white dark:bg-slate-800 h-[38px]">
              <label
                htmlFor="sequence-input"
                className="text-slate-700 dark:text-slate-200 font-medium"
              >
                {formatMessage({
                  id: 'sequence',
                  defaultMessage: 'Display Order',
                })}
              </label>
              <input
                type="number"
                id="sequence-input"
                className="text-center w-12 bg-transparent border border-slate-300 dark:border-slate-600 rounded focus:ring-0 focus:outline-none text-sm font-bold text-slate-900 dark:text-slate-300 px-2 py-1"
                defaultValue={product?.sequence}
                onBlur={updateProductSequence}
              />
            </div>
            {status === 'DRAFT' && hasRole('removeProduct') && (
              <HeaderDeleteButton onClick={handleDeleteProduct} />
            )}
          </div>
        </div>

        <div className="mt-5 flex items-baseline gap-2">
          <span className="text-sm text-slate-600 dark:text-slate-400">
            ID:
          </span>
          <span className="text-sm font-mono">{product?._id}</span>
        </div>

        <p className="text-md mt-3">{product?.['__typename']}</p>

        <div className="mt-3 flex flex-wrap gap-3 lg:gap-10 text-slate-600 dark:text-slate-400">
          {product?.created && (
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-slate-600 dark:text-slate-300">
                {formatMessage({ id: 'created', defaultMessage: 'Created' })}:
              </span>
              <span className="text-md">
                {formatDateTime(product.created, {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </span>
            </div>
          )}

          {product?.published && (
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-slate-600 dark:text-slate-300">
                {formatMessage({
                  id: 'published',
                  defaultMessage: 'Published',
                })}
                :
              </span>
              <span className="text-md">
                {formatDateTime(product.published, {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </span>
            </div>
          )}

          {product?.updated && (
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-slate-600 dark:text-slate-300">
                {formatMessage({ id: 'updated', defaultMessage: 'Updated' })}:
              </span>
              <span className="text-md">
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
        <ProductDetail
          product={product}
          extendedData={extendedData}
          updateProductSequence={updateProductSequence}
          handleDeleteProduct={handleDeleteProduct}
        />
      )}
    </div>
  );
};

export default ProductDetailPage;
