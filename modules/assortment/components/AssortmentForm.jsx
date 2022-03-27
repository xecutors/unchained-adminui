import { useIntl } from 'react-intl';
import CheckboxField from '../../forms/components/CheckboxField';
import Form from '../../forms/components/Form';
import SubmitButton from '../../forms/components/SubmitButton';
import TagInputField from '../../forms/components/TagInputField';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';

const AssortmentForm = ({ onSubmit, onSubmitSuccess }) => {
  const { formatMessage } = useIntl();
  const successMessage = formatMessage({
    id: 'assortment_added',
    defaultMessage: 'Assortment added successfully!',
  });
  const form = useForm({
    submit: onSubmit,
    onSubmitSuccess,
    successMessage,
    enableReinitialize: true,
    initialValues: {
      isRoot: false,
      title: '',
      tags: [],
    },
  });

  return (
    <Form form={form}>
      <div className="py-5 px-5">
        <TextField
          name="title"
          id="title"
          label={formatMessage({
            id: 'title',
            defaultMessage: 'Title',
          })}
          autoComplete="off"
          required
          className="mb-5 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />

        <TagInputField name="tags" id="tags" />
      </div>
      <div className="mx-5 mb-5 flex h-5 items-center">
        <CheckboxField
          id="isRoot"
          name="isRoot"
          type="checkbox"
          label={formatMessage({
            id: 'root_node',
            defaultMessage: 'Root node',
          })}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
      </div>
      <div className="sm:px-15 space-y-6 bg-gray-50 p-5 text-right sm:p-6">
        <SubmitButton
          label={formatMessage({
            id: 'add_assortment',
            defaultMessage: 'Add Assortment',
          })}
        />
      </div>
    </Form>
  );
};

export default AssortmentForm;
