import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import FormWrapper from '../../modules/common/components/FormWrapper';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import ProductForm from '../../modules/product/components/ProductForm';
import useCreateProduct from '../../modules/product/hooks/useCreateProduct';

const AddProduct = () => {
  const { createProduct, loading } = useCreateProduct();
  const router = useRouter();
  const { formatMessage } = useIntl();
  const onSubmitSuccess = (_, { texts }) => {
    router.push(`/products/${texts?.slug}`);
  };

  const onSubmit = async ({ title, type, tags }) => {
    const { data } = await createProduct({ title, type, tags });
    return { success: true, data: data?.createProduct };
  };
  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'new_product_header',
          defaultMessage: 'New product',
        })}
      />
      <div className="mt-6 lg:grid lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-2">
          <h3 className="text-lg font-medium leading-6 text-slate-900">
            {formatMessage({
              id: 'product_type',
              defaultMessage: 'Product type',
            })}
          </h3>
          <p className="max-w-2xl text-sm text-slate-500">
            Here comes an explainer
          </p>
        </div>

        <div className="lg:col-span-2">
          <FormWrapper>
            {loading ? (
              <Loading />
            ) : (
              <ProductForm
                onSubmit={onSubmit}
                onSubmitSuccess={onSubmitSuccess}
              />
            )}
          </FormWrapper>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
