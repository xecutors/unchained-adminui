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

  const form = useForm({
    submit: onSubmit,
    onSubmitSuccess,
    enableReinitialize: true,
    initialValues: {
      title: '',
      type: '',
      tags: [],
    },
  });

  return (
    <Form form={form}>
      <div className="space-y-6 sm:space-y-5">
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
          className="text-sm block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
        />

        <div className="flex items-center h-5">
          <SelectField
            className="w-full mt-0"
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

      <SubmitButton
        label={formatMessage({
          id: 'add_product',
          defaultMessage: 'Add product',
        })}
      />
    </Form>
  );
};

export default ProductForm;
