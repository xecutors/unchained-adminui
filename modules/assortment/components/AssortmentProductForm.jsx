import { useState } from 'react';
import { useIntl } from 'react-intl';

import Form from '../../forms/components/Form';
import TagInput from '../../common/components/TagInput';
import SubmitButton from '../../forms/components/SubmitButton';
import useForm from '../../forms/hooks/useForm';

import useAddAssortmentProduct from '../hooks/useAddAssortmentProduct';
import FormErrors from '../../forms/components/FormErrors';
import useSearchProducts from '../../product/hooks/useSearchProducts';
import FilterableDropdown from '../../common/components/FilterableDropdown';

const normalizeProducts = (productsList = []) => {
  return productsList?.map(({ _id, status, texts, media }) => ({
    id: _id,
    tag: status,
    ...texts,
    image: media?.length ? media[0]?.file.url : null,
  }));
};

const AssortmentProductForm = ({ assortmentId }) => {
  const [tags, setTags] = useState('');
  const [queryString, setQueryString] = useState('');
  const { formatMessage } = useIntl();
  const { addAssortmentProduct } = useAddAssortmentProduct();

  const successMessage = formatMessage({
    id: 'saved',
    defaultMessage: 'Saved',
  });

  const { products, loading } = useSearchProducts({
    queryString,
    limit: 10,
    includeInactive: true,
  });

  const onSubmit = async ({ productId }) => {
    await addAssortmentProduct({ productId, assortmentId, tags });
    return true;
  };

  const form = useForm({
    submit: onSubmit,
    successMessage,
    initialValues: {
      productId: '',
      tags: '',
    },
  });

  return (
    <Form form={form}>
      <div className="overflow-hidden shadow sm:rounded-md">
        <div className="grid gap-6 bg-white px-4 py-5 sm:p-6">
          <div className="col-span-12">
            <TagInput
              name="tags"
              id="tags"
              label={formatMessage({
                id: 'tags',
                defaultMessage: 'Tags',
              })}
              onChange={(newTags) => setTags(newTags)}
              className="mt-1 w-full py-2 text-sm font-medium text-gray-500 sm:ml-1"
            />

            <FilterableDropdown
              name="productId"
              data={normalizeProducts(products)}
              isLoading={loading}
              label={formatMessage({
                id: 'product',
                defaultMessage: 'Product',
              })}
              required
              onFilter={setQueryString}
              className="mt-1 w-full py-2 text-sm font-medium text-gray-500"
            />
          </div>
        </div>
        <FormErrors />
        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <SubmitButton
            label={formatMessage({
              id: 'save',
              defaultMessage: 'Save',
            })}
          />
        </div>
      </div>
    </Form>
  );
};

export default AssortmentProductForm;
