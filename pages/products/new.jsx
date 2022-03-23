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
      <div className="mx-auto sm:max-w-2xl">
        <PageHeader
          headerText={formatMessage({
            id: 'new_product_header',
            defaultMessage: 'New product',
          })}
        />
        <div className="mt-6">
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
