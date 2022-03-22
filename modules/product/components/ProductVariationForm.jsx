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
    id: 'saved',
    defaultMessage: 'Saved',
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
      <div className="space-y-6 sm:p-6 rounded-md relative max-w-full">
        <div className="sm:flex max-w-full  justify-between align-baseline">
          <TextField
            name="title"
            id="title"
            label={formatMessage({
              id: 'title',
              defaultMessage: 'Title',
            })}
            required
            autoComplete="on"
            className="text-sm  font-medium text-gray-500 py-2 sm:ml-1 mt-1 w-full"
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
            className="text-sm  font-medium text-gray-500 py-2  sm:ml-1 mt-1 w-full"
          />
        </div>
        <SelectField
          required
          className="text-sm  font-medium text-gray-500 py-1.5 w-full mt-2.5"
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
      <div className="px-5 sm:px-15 space-y-6 sm:p-6 bg-gray-50 text-right">
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
