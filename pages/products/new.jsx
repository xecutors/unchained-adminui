import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import FormWrapper from '../../modules/common/components/FormWrapper';
import PageHeader from '../../modules/common/components/PageHeader';
import ProductForm from '../../modules/product/components/ProductForm';
import useCreateProduct from '../../modules/product/hooks/useCreateProduct';

const AddProduct = () => {
  const { createProduct } = useCreateProduct();
  const router = useRouter();
  const { formatMessage } = useIntl();
  const onSubmitSuccess = () => {
    router.push('/products');
  };

  const onSubmit = async ({ title, type, tags }) => {
    await createProduct({ title, type, tags });
    return true;
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
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Product Type
          </h3>
          <p className="max-w-2xl text-sm text-gray-500">
            Here comes an explainer
          </p>
        </div>

        <div className="lg:col-span-2">
          <FormWrapper>
            <ProductForm
              onSubmit={onSubmit}
              onSubmitSuccess={onSubmitSuccess}
            />
          </FormWrapper>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
