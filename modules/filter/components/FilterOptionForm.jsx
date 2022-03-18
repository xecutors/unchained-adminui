import { useIntl } from 'react-intl';
import Form from '../../forms/components/Form';
import FormErrors from '../../forms/components/FormErrors';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';

const FilterOptionForm = ({ onCancel, onSubmit }) => {
  const { formatMessage } = useIntl();
  const successMessage = formatMessage({
    id: 'filter_option_added_success',
    defaultMessage: 'Filter option added successfully',
  });

  const form = useForm({
    submit: onSubmit,
    successMessage,
    initialValues: {
      title: '',
      value: '',
    },
  });
  return (
    <Form form={form}>
      <div className="flex">
        <TextField
          name="value"
          label={formatMessage({
            id: 'filter_option_value',
            defaultMessage: 'value',
          })}
          required
        />
        <TextField
          name="title"
          label={formatMessage({
            id: 'filter_option_title',
            defaultMessage: 'Title',
          })}
          required
        />
      </div>
      <FormErrors />
      <div className="flex justify-between">
        <button
          onClick={onCancel}
          type="button"
          className="mb-5 mt-5 mr-2  px-3 py-1 border border-transparent  shadow-sm text-sm leading-5 font-medium text-white bg-red-600  h-9 rounded-md"
        >
          {formatMessage({ id: 'cancel', defaultMessage: 'Cancel' })}
        </button>
        <SubmitButton
          full
          className="w-full"
          label={formatMessage({
            id: 'add_filter_option',
            defaultMessage: 'Add option',
          })}
        />
      </div>
    </Form>
  );
};

export default FilterOptionForm;
