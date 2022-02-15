import { useState } from 'react';
import { useIntl } from 'react-intl';

import Form from '../../forms/components/Form';
import TagInput from '../../common/components/TagInput';
import SubmitButton from '../../forms/components/SubmitButton';
import SelectField from '../../forms/components/SelectField';
import useForm from '../../forms/hooks/useForm';

import useAddAssortmentProduct from '../hooks/useAddAssortmentProduct';
import useProducts from '../../product/hooks/useProducts';
import { convertArrayOfObjectToObject } from '../../common/convertArrayOfObjectToObject';
import FormErrors from '../../forms/components/FormErrors';

const normalizeProducts = (productsList = []) => {
  return productsList?.map(({ _id, texts }) => ({
    _id,
    title: texts?.title,
    subtitle: texts?.subtitle,
  }));
};

const AssortmentProductForm = ({ assortmentId }) => {
  const [tags, setTags] = useState('');
  const { formatMessage } = useIntl();
  const { addAssortmentProduct } = useAddAssortmentProduct();
  const { products } = useProducts();

  const successMessage = formatMessage({
    id: 'saved',
    defaultMessage: 'Saved',
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
      <div className="shadow overflow-hidden sm:rounded-md">
        <div className="grid gap-6 px-4 py-5 bg-white sm:p-6">
          <div className="col-span-12">
            <TagInput
              name="tags"
              id="tags"
              label={formatMessage({
                id: 'tags',
                defaultMessage: 'tags',
              })}
              onChange={(newTags) => setTags(newTags)}
              className="text-sm font-medium text-gray-500 py-2 sm:ml-1   mt-1 w-full"
            />

            <SelectField
              name="productId"
              label={formatMessage({
                id: 'product',
                defaultMessage: 'Product',
              })}
              required
              options={convertArrayOfObjectToObject(
                normalizeProducts(products),
                'title',
                '_id',
              )}
              className="text-sm font-medium text-gray-500 py-2  mt-1 w-full"
            />
          </div>
        </div>
        <FormErrors />
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
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
