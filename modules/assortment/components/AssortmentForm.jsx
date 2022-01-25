import { useIntl } from 'react-intl';
import CheckboxField from '../../forms/components/CheckboxField';
import Form from '../../forms/components/Form';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';

const AssortmentForm = ({ onSubmit, onSubmitSuccess, defaultValue = {} }) => {
  const form = useForm({
    submit: onSubmit,
    onSubmitSuccess,
    enableReinitialize: true,
    initialValues: {
      type: '',
      ...defaultValue,
    },
  });
  const { formatMessage } = useIntl();
  return (
    <Form form={form}>
      <div className=" space-y-6 sm:space-y-5">
        <TextField
          name="type"
          id="type"
          label={formatMessage({
            id: 'type',
            defaultMessage: 'Type',
          })}
          autoComplete="on"
          required
          className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
        />
        <div className="flex items-center h-5">
          <CheckboxField
            id="root-node"
            name="rootnode"
            label={formatMessage({
              id: 'root_node',
              defaultMessage: 'Root node',
            })}
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            required
          />
        </div>
      </div>

      <SubmitButton
        label={formatMessage({ id: 'add', defaultMessage: 'Add' })}
      />
    </Form>
  );
};

export default AssortmentForm;
