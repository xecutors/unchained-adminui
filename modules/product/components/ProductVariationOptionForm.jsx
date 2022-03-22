import { useIntl } from 'react-intl';
import Form from '../../forms/components/Form';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';

const ProductVariationOptionForm = ({ onSubmit }) => {
  const { formatMessage } = useIntl();
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
      <div className="flex gap-2">
        <TextField
          name="title"
          label={formatMessage({ id: 'title', defaultMessage: 'Title' })}
          required
        />
        <TextField
          name="value"
          label={formatMessage({ id: 'value', defaultMessage: 'Value' })}
          required
        />
        <span className="self-end">
          <SubmitButton
            className="h-11"
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
