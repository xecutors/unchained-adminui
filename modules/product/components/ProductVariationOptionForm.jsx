import { useIntl } from 'react-intl';
import useCurrentRoles from '../../accounts/hooks/useCurrentRoles';
import ACTION_ROLES from '../../common/data/roles';
import Form from '../../forms/components/Form';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';

const ProductVariationOptionForm = ({ onSubmit }) => {
  const { formatMessage } = useIntl();
  const { hasRole } = useCurrentRoles();

  const successMessage = formatMessage({
    id: 'variation_option_added',
    defaultMessage: 'Variation option added successfully!',
  });

  const form = useForm({
    submit: onSubmit,
    successMessage,
    initialValues: {
      value: '',
      title: '',
    },
  });

  return (
    <Form form={form}>
      <div className="mt-2 flex gap-2 px-2 pt-2 sm:px-4">
        <TextField
          className="mt-0 shrink grow basis-1/3 py-1"
          name="title"
          label={formatMessage({ id: 'title', defaultMessage: 'Title' })}
          required
        />
        <TextField
          className="mt-0 shrink grow basis-1/3 py-1"
          name="value"
          label={formatMessage({ id: 'value', defaultMessage: 'Value' })}
          required
        />

        <span className="flex-auto self-end">
          <SubmitButton
            hidden={!hasRole(ACTION_ROLES.products.createVariationOption)}
            className="p-0"
            label={formatMessage({
              id: 'add_options',
              defaultMessage: 'Add option',
            })}
          />
        </span>
      </div>
    </Form>
  );
};

export default ProductVariationOptionForm;
