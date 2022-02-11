import { useState } from 'react';
import { useIntl } from 'react-intl';

import Form from '../../forms/components/Form';
import TagInput from '../../common/components/TagInput';
import SubmitButton from '../../forms/components/SubmitButton';
import SelectField from '../../forms/components/SelectField';
import useForm from '../../forms/hooks/useForm';

import useAddAssortmentProduct from '../hooks/useAddAssortmentProduct';

const AssortmentProductForm = ({ assortmentId }) => {
  const [tags, setTags] = useState('');
  const { formatMessage } = useIntl();
  const { addAssortmentProduct } = useAddAssortmentProduct();

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
      <div className="w-full  justify-between1 1align-baseline">
        <TagInput
          name="tags"
          id="tags"
          label={formatMessage({
            id: 'tags',
            defaultMessage: 'tags',
          })}
          onChange={(newTags) => setTags(newTags)}
          autoComplete="on"
          options={{}}
          className="text-sm font-medium text-gray-500 py-2 sm:ml-1   mt-1 w-full"
        />

        <SelectField
          name="productId"
          label={formatMessage({
            id: 'product',
            defaultMessage: 'Product',
          })}
          autoComplete="on"
          options={{}}
          className="text-sm font-medium text-gray-500 py-2  mt-1 w-full"
        />
      </div>
      <div className="w-fit">
        <SubmitButton
          label={formatMessage({
            id: 'save',
            defaultMessage: 'Save',
          })}
          className="py-6 h-9 "
          full
        />
      </div>
    </Form>
  );
};

export default AssortmentProductForm;
