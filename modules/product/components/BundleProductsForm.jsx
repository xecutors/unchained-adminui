import { useState } from 'react';
import { useIntl } from 'react-intl';
import FilterableDropdown from '../../common/components/FilterableDropdown';
import Form from '../../forms/components/Form';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import useSearchProducts from '../hooks/useSearchProducts';

const normalizeProduct = (products = []) => {
  return products.map(({ _id, status, texts, media }) => ({
    id: _id,
    tag: status,
    ...texts,
    image: media?.length ? media[0]?.file.url : null,
  }));
};
const BundleProductsForm = () => {
  const [queryString, setQueryString] = useState('');
  const { formatMessage } = useIntl();
  const { products, loading } = useSearchProducts({
    queryString,
    limit: 10,
    includeInactive: true,
  });
  const form = useForm({
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
        label={formatMessage({ id: 'product', defaultMessage: 'Product' })}
        data={normalizeProduct(products)}
        isLoading={loading}
        required
      />
      <TextField
        name="quantity"
        type="number"
        label={formatMessage({ id: 'quantity', defaultMessage: 'Quantity' })}
      />
      <SubmitButton />
    </Form>
  );
};

export default BundleProductsForm;
