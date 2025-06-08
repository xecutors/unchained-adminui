import { XMarkIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import { FormattedMessage, useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { IProduct, IProductTexts } from '../../gql/types';

import useAuth from '../../modules/Auth/useAuth';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import HeaderDeleteButton from '../../modules/common/components/HeaderDeleteButton';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import CustomError from '../../modules/common/CustomError';
import useFormatDateTime from '../../modules/common/utils/useFormatDateTime';
import DangerMessage from '../../modules/modal/components/DangerMessage';
import useModal from '../../modules/modal/hooks/useModal';
import ProductDetail from '../../modules/product/components/ProductDetail';
import useProduct from '../../modules/product/hooks/useProduct';
import useRemoveProduct from '../../modules/product/hooks/useRemoveProduct';

const ProductDetailPage = ({ slug }) => {
  const { formatMessage } = useIntl();
  const { formatDateTime } = useFormatDateTime();
  const { hasRole } = useAuth();
  const { query, ...router } = useRouter();
  const { setModal } = useModal();

  const { product, loading, extendedData } = useProduct({
    slug,
  });
  const { removeProduct } = useRemoveProduct();

  const handleOnClick = async () => {
    await setModal(
      <DangerMessage
        onCancelClick={() => setModal('')}
        message={formatMessage({
          id: 'delete_product_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it and it is nonreversible. Are you sure you want to delete this product? ',
        })}
        onOkClick={async () => {
          setModal('');
          try {
            await removeProduct({ productId: product?._id });
            toast.success(
              formatMessage({
                id: 'product_deleted_success',
                defaultMessage: 'Deleted successfully ',
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
                      className="h-6 w-6 text-red-600"
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
    <div className="mt-6 max-w-full">
      <BreadCrumbs
        routeName={slug}
        depth={3}
        currentPageTitle={
          ((product as IProduct)?.texts as IProductTexts)?.title
        }
      />
      <div className="align-center flex min-w-full justify-between">
        <PageHeader
          headerText={
            <FormattedMessage
              id="product_detail_header"
              defaultMessage="Product detail <b>({id})</b>"
              values={{
                b: (chunks) => <b className="text-lg">{chunks}</b>,

                id: product?._id,
              }}
            />
          }
        >
          <div className="mr-4">
            {product?.created && (
              <FormattedMessage
                id="added_date"
                defaultMessage="<b>Created :</b>  {created} "
                values={{
                  b: (chunks) => <b>{chunks}</b>,

                  created: formatDateTime(product.created, {
                    dateStyle: 'long',
                    timeStyle: 'short',
                  }),
                }}
                tagName="div"
              />
            )}

            {product?.published && (
              <FormattedMessage
                id="published_date"
                defaultMessage="<b>Published :</b>  {published} "
                values={{
                  b: (chunks) => <b>{chunks}</b>,

                  published: formatDateTime(product.published, {
                    dateStyle: 'long',
                    timeStyle: 'short',
                  }),
                }}
                tagName="div"
              />
            )}
            {product?.updated && (
              <FormattedMessage
                id="updated_date"
                defaultMessage="<b>Updated :</b>  {updated} "
                values={{
                  b: (chunks) => <b>{chunks}</b>,

                  updated: formatDateTime(product.updated, {
                    dateStyle: 'long',
                    timeStyle: 'short',
                  }),
                }}
                tagName="div"
              />
            )}
          </div>
        </PageHeader>
        {product && product.status === 'DRAFT' && hasRole('removeProduct') ? (
          <HeaderDeleteButton onClick={handleOnClick} />
        ) : null}
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
