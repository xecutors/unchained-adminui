import { useState } from 'react';
import { useIntl } from 'react-intl';
import useAuth from '../../Auth/useAuth';
import FilterableDropdown from '../../common/components/FilterableDropdown';
import ACTION_ROLES from '../../common/data/roles';
import Form from '../../forms/components/Form';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import useCreateProductBundleItem from '../hooks/useCreateProductBundleItem';
import useSearchProducts from '../hooks/useSearchProducts';

const normalizeProduct = (products = []) => {
  return products.map(({ _id, status, texts, media }) => ({
    id: _id,
    tag: status,
    ...texts,
    image: media?.length ? media[0]?.file.url : null,
  }));
};
const BundleProductsForm = ({ productId: currentProductId }) => {
  const [queryString, setQueryString] = useState('');
  const { createProductBundleItem } = useCreateProductBundleItem();
  const { hasRole } = useAuth();
  const { formatMessage } = useIntl();
  const { products, loading } = useSearchProducts({
    queryString,
    limit: 10,
    includeInactive: true,
  });

  const onSubmit = async ({ productId, quantity }) => {
    await createProductBundleItem({
      item: { productId, quantity },
      productId: currentProductId,
    });
    return true;
  };
  const successMessage = formatMessage({
    id: 'bundle_item_added',
    defaultMessage: 'Bundle product added successfully',
  });
  const form = useForm({
    submit: onSubmit,
    successMessage,
    onSubmitSuccess: () => {
      form.formik.resetForm();
    },
    initialValues: {
      productId: '',
      quantity: 1,
    },
  });

  return (
    <Form form={form}>
      <FilterableDropdown
        name="productId"
        onFilter={setQueryString}
        queryString={queryString}
        label={formatMessage({ id: 'product', defaultMessage: 'Product' })}
        data={normalizeProduct(products)}
        isLoading={loading}
        buttonClassName="mb-0"
        required
      />
      <TextField
        name="quantity"
        type="number"
        label={formatMessage({ id: 'quantity', defaultMessage: 'Quantity' })}
      />
      <SubmitButton
        hidden={!hasRole(ACTION_ROLES.products.createBundleItem)}
        className="mt-2"
      />
    </Form>
  );
};

export default BundleProductsForm;
