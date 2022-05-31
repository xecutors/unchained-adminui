import { useRouter } from 'next/router';
import { FormattedMessage, useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import useAuth from '../../modules/Auth/useAuth';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import HeaderDeleteButton from '../../modules/common/components/HeaderDeleteButton';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import ACTION_ROLES from '../../modules/common/data/roles';
import useFormatDateTime from '../../modules/common/utils/useFormatDateTime';
import DangerMessage from '../../modules/modal/components/DangerMessage';
import useModal from '../../modules/modal/hooks/useModal';
import ProductDetail from '../../modules/product/components/ProductDetail';
import useProduct from '../../modules/product/hooks/useProduct';
import useRemoveProduct from '../../modules/product/hooks/useRemoveProduct';

const ProductDetailPage = () => {
  const { formatMessage } = useIntl();
  const { formatDateTime } = useFormatDateTime();
  const { hasRole } = useAuth();
  const { query } = useRouter();
  const { setModal } = useModal();

  const { slug = '' } = query || {};

  const { product, loading } = useProduct({ slug });
  const { removeProduct } = useRemoveProduct();

  const handleOnClick = async () => {
    await setModal(
      <DangerMessage
        message={formatMessage({
          id: 'delete_product_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it and it is nonreversible. Are you sure you want to delete this product? ',
        })}
        onOkClick={async () => {
          setModal('');
          await removeProduct({ productId: product?._id });
          toast.success(
            formatMessage({
              id: 'product_deleted_success',
              defaultMessage: 'Deleted successfully ',
            }),
          );
        }}
      />,
    );
  };

  return (
    <div className="mt-6 max-w-full">
      <BreadCrumbs />
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

                  created: formatDateTime(new Date(product.created)),
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

                  published: formatDateTime(new Date(product.published)),
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

                  updated: formatDateTime(new Date(product.updated)),
                }}
                tagName="div"
              />
            )}
          </div>
        </PageHeader>
        {product &&
        product.status === 'DRAFT' &&
        hasRole(ACTION_ROLES.products.delete) ? (
          <HeaderDeleteButton onClick={handleOnClick} />
        ) : null}
      </div>
      {loading ? <Loading /> : <ProductDetail product={product} />}
    </div>
  );
};

export default ProductDetailPage;
