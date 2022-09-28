import { useRouter } from 'next/router';
import { FormattedMessage, useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import FormWrapper from '../../modules/common/components/FormWrapper';
import PageHeader from '../../modules/common/components/PageHeader';
import generateUniqueId from '../../modules/common/utils/getUniqueId';
import ProductForm from '../../modules/product/components/ProductForm';
import useCreateProduct from '../../modules/product/hooks/useCreateProduct';

const AddProduct = () => {
  const { createProduct } = useCreateProduct();
  const router = useRouter();
  const { formatMessage } = useIntl();
  const onSubmitSuccess = (_, { ...result }) => {
    router.push(`/products/${generateUniqueId(result)}`);
  };

  const onSubmit = async ({ title, type, tags }) => {
    const { data, errors } = await createProduct({ title, type, tags });
    if (errors?.length) return false;
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
          <h3 className="text-lg font-medium leading-6 text-slate-900 dark:text-slate-200">
            {formatMessage({
              id: 'product_type',
              defaultMessage: 'Product type',
            })}
          </h3>
          <div className="divide-y divide-slate-200 dark:divide-slate-700 dark:text-slate-400 mr-4">
            <div className="my-2 py-2">
              <FormattedMessage
                id="simple_product_definition"
                defaultMessage=" <h3>Simple</h3> <p>Simple product is the most commonly used type of product type. It accepts configuration values for price, dimension and warehousing. Most e-commerce product needs are satisfied by this type </p>"
                values={{
                  h3: (chunks) => <h3 className="font-bold ">{chunks}</h3>,
                  p: (chunks) => <p>{chunks}</p>,
                }}
              />
            </div>
            <div className="my-2 py-2">
              <FormattedMessage
                id="plan_product_definition"
                defaultMessage=" <h3>Plan</h3> <p>Plan product is use when you have a product that is offered per subscription base. Since for this type of product the payment is usually recurring, you can adjust the interval of payment calculation.

              </p>"
                values={{
                  h3: (chunks) => <h3 className="font-bold ">{chunks}</h3>,
                  p: (chunks) => <p>{chunks}</p>,
                }}
              />
            </div>
            <div className="my-2 py-2">
              <FormattedMessage
                id="bundle_product_definition"
                defaultMessage=" <h3>Bundle</h3> <p>As the name suggest this product type enables you to create a collection/bundle of products as one and set the price accordingly. This type of product is useful if you have christmas package for example.  </p>"
                values={{
                  h3: (chunks) => <h3 className="font-bold ">{chunks}</h3>,
                  p: (chunks) => <p>{chunks}</p>,
                }}
              />
            </div>
            <div className="my-2 py-2">
              <FormattedMessage
                id="configurable_product_definition"
                defaultMessage=" <h3>Configurable</h3> <p>Configurable Product is used to organize varieties of a product. A product might have a variation in color, size or other distinct property in that case you can use a configurable product type to organize all the variation under one category and outline there difference. </p>"
                values={{
                  h3: (chunks) => <h3 className="font-bold ">{chunks}</h3>,
                  p: (chunks) => <p>{chunks}</p>,
                }}
              />
            </div>
          </div>
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
