import { useIntl } from 'react-intl';
import useAuth from '../../Auth/useAuth';
import ACTION_ROLES from '../../common/data/roles';

import Form from '../../forms/components/Form';
import SelectField from '../../forms/components/SelectField';
import SubmitButton from '../../forms/components/SubmitButton';
import TagInputField from '../../forms/components/TagInputField';
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
  const { hasRole } = useAuth();
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
      <div className="p-5 pb-7 sm:max-w-full">
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
          className="block w-full max-w-full rounded-md border-slate-200 text-sm focus:border-indigo-400 focus:ring-indigo-400 sm:text-sm"
        />

        <div className="my-5 flex items-center">
          <SelectField
            className="mt-1 w-full"
            label={formatMessage({ id: 'type', defaultMessage: 'Type' })}
            placeholder={formatMessage({ id: 'type', defaultMessage: 'Type' })}
            required
            name="type"
            options={ProductTypes}
          />
        </div>
        <TagInputField
          name="tags"
          label={formatMessage({ id: 'tags', defaultMessage: 'Tags' })}
        />
      </div>

      <div className="sm:px-15 space-y-6 border-t border-t-indigo-50 bg-slate-50 p-5 text-right">
        <SubmitButton
          hidden={!hasRole(ACTION_ROLES.products.create)}
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
