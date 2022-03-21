import { useIntl } from 'react-intl';

import TagInput from '../../common/components/TagInput';

import Form from '../../forms/components/Form';
import SelectField from '../../forms/components/SelectField';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';

export const ProductTypes = {
  SimpleProduct: 'Simple',
  ConfigurableProduct: 'Configurable',
  BundleProduct: 'Bundle',
  PlanProduct: 'Plan',
};

const ProductForm = ({ onSubmit, onSubmitSuccess }) => {
  const { formatMessage } = useIntl();
  const successMessage = formatMessage({
    id: 'product_added',
    defaultMessage: 'Product added successfully!',
  });
  const form = useForm({
    submit: onSubmit,
    onSubmitSuccess,
    enableReinitialize: true,
    successMessage,
    initialValues: {
      title: '',
      type: '',
      tags: [],
    },
  });

  return (
    <Form form={form}>
      <div className="px-5 py-2 sm:max-w-full">
        <TextField
          name="title"
          id="name"
          label={formatMessage({
            id: 'name',
            defaultMessage: 'Name',
          })}
          placeholder={formatMessage({
            id: 'name',
            defaultMessage: 'Name',
          })}
          required
          autoComplete="on"
          className="mt-2 block w-full max-w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />

        <div className="my-5 flex items-center">
          <SelectField
            className="mt-0 w-full"
            label={formatMessage({ id: 'type', defaultMessage: 'Type' })}
            placeholder={formatMessage({ id: 'type', defaultMessage: 'Type' })}
            hideLabel
            name="type"
            options={ProductTypes}
          />
        </div>
        <TagInput
          onChange={async (values) => {
            await form.formik.setValues({
              ...form.formik.values,
              tags: values,
            });
          }}
        />
      </div>

      <div className="sm:px-15 space-y-6 bg-gray-50 p-5 text-right sm:p-6">
        <SubmitButton
          label={formatMessage({
            id: 'add_product',
            defaultMessage: 'Add product',
          })}
          third
        />
      </div>
    </Form>
  );
};

export default ProductForm;
