import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import {
  addApolloState,
  initializeApollo,
} from '../../modules/apollo/apolloClient';
import useAuth from '../../modules/Auth/useAuth';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import HeaderDeleteButton from '../../modules/common/components/HeaderDeleteButton';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import ACTION_ROLES from '../../modules/common/data/roles';
import DangerMessage from '../../modules/modal/components/DangerMessage';
import useModal from '../../modules/modal/hooks/useModal';
import ProductDetail from '../../modules/product/components/ProductDetail';
import useProduct, {
  preFetchProduct,
} from '../../modules/product/hooks/useProduct';
import useRemoveProduct from '../../modules/product/hooks/useRemoveProduct';

const ProductDetailPage = () => {
  const { formatMessage } = useIntl();
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
          headerText={formatMessage({
            id: 'product_detail',
            defaultMessage: 'Product Detail',
          })}
        />

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

export async function getStaticProps({ params, locale }) {
  const apolloClient = await initializeApollo(null, { locale });

  const { slug } = params;
  const product = await preFetchProduct(apolloClient, { locale, slug });
  if (!product || product?.status === 'DELETED')
    return {
      notFound: true,
    };

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 60,
  });
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export default ProductDetailPage;
