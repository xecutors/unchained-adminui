import { useIntl } from 'react-intl';
import { convertArrayOfObjectToObject } from '../../common/convertArrayOfObjectToObject';

import Form from '../../forms/components/Form';
import SelectField from '../../forms/components/SelectField';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import useProductVariationTypes from '../hooks/useProductVariationTypes';

const ProductVariationForm = ({ onSubmit }) => {
  const { formatMessage } = useIntl();

  const { variationTypes } = useProductVariationTypes();

  const successMessage = formatMessage({
    id: 'product_variation_added',
    defaultMessage: 'Product variation added successfully',
  });

  const form = useForm({
    submit: onSubmit,
    successMessage,
    initialValues: {
      title: '',
      key: '',
      type: '',
    },
  });

  return (
    <Form form={form}>
      <div className="max-w-full space-y-6 rounded-md sm:p-6">
        <div className="max-w-full">
          <TextField
            name="title"
            id="title"
            label={formatMessage({
              id: 'title',
              defaultMessage: 'Title',
            })}
            required
            autoComplete="on"
            className="mt-1 w-full py-2 text-sm font-medium text-gray-500 sm:ml-1"
          />
          <TextField
            name="key"
            id="key "
            label={formatMessage({
              id: 'key',
              defaultMessage: 'Key',
            })}
            required
            autoComplete="on"
            className="mt-1 w-full py-2 text-sm font-medium text-gray-500 sm:ml-1"
          />
        </div>
        <SelectField
          required
          className="mt-2.5  w-full py-1.5 text-sm font-medium text-gray-500"
          label={formatMessage({
            id: 'type',
            defaultMessage: 'Type',
          })}
          name="type"
          options={convertArrayOfObjectToObject(
            variationTypes,
            'value',
            'value',
          )}
        />
      </div>
      <div className="sm:px-15 space-y-6 bg-gray-50 px-5 py-6 text-right">
        <SubmitButton
          label={formatMessage({
            id: 'save',
            defaultMessage: 'Save',
          })}
          full
        />
      </div>
    </Form>
  );
};

export default ProductVariationForm;
