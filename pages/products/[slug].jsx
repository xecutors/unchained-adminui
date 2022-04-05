import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import HeaderDeleteButton from '../../modules/common/components/HeaderDeleteButton';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import DangerMessage from '../../modules/modal/components/DangerMessage';
import useModal from '../../modules/modal/hooks/useModal';
import ProductDetail from '../../modules/product/components/ProductDetail';
import useProduct from '../../modules/product/hooks/useProduct';
import useRemoveProduct from '../../modules/product/hooks/useRemoveProduct';

const ProductDetailPage = () => {
  const { formatMessage } = useIntl();
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
          headerText={formatMessage({
            id: 'product_detail',
            defaultMessage: 'Product Detail',
          })}
        />

        {product && product.status === 'DRAFT' ? (
          <HeaderDeleteButton onClick={handleOnClick} />
        ) : null}
      </div>
      {loading ? <Loading /> : <ProductDetail product={product} />}
    </div>
  );
};

export default ProductDetailPage;
