import { useIntl } from 'react-intl';
import Form from '../../forms/components/Form';
import SelectField from '../../forms/components/SelectField';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';

const FilterForm = ({ onSubmit, onSubmitSuccess }) => {
  const { formatMessage } = useIntl();

  const form = useForm({
    submit: onSubmit,
    onSubmitSuccess,
    enableReinitialize: true,
    initialValues: {
      adapterKey: '',
      type: '',
    },
  });

  return (
    <Form form={form}>
      <div className="space-y-6 sm:space-y-5">
        <TextField
          name="name"
          id="name"
          label={formatMessage({
            id: 'name',
            defaultMessage: 'Name',
          })}
          hideLabel
          placeholder={formatMessage({
            id: 'name',
            defaultMessage: 'Name',
          })}
          required
          autoComplete="on"
          className="text-sm block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
        />

        <TextField
          name="key"
          id="key"
          label={formatMessage({
            id: 'key',
            defaultMessage: 'Key',
          })}
          hideLabel
          placeholder={formatMessage({
            id: 'key',
            defaultMessage: 'Key',
          })}
          required
          autoComplete="on"
          className="text-sm block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
        />

        <SelectField
          className="w-full mt-0"
          label={formatMessage({ id: 'type', defaultMessage: 'Type' })}
          hideLabel
          name="type"
          options={{}}
        />
      </div>

      <SubmitButton
        label={formatMessage({ id: 'add', defaultMessage: 'Add' })}
      />
    </Form>
  );
};

export default FilterForm;
