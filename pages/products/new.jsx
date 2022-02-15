import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import FormHeader from '../../modules/common/components/FormHeader';
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
      <div className="mt-6 sm:max-w-2xl">
        <FormHeader>
          <ProductForm onSubmit={onSubmit} onSubmitSuccess={onSubmitSuccess} />
        </FormHeader>
      </div>
    </>
  );
};

export default AddProduct;
